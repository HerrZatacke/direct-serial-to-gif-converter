import fs from 'fs';
import path from 'path';
import SerialPort from 'serialport';
import Readline from '@serialport/parser-readline';

class PortHandler {
  constructor(dispatch) {
    this.dispatchFunction = dispatch;
    this.port = null;
    this.lines = [];
    this.outDir = path.join(process.cwd(), 'out');
    this.rawDir = path.join(this.outDir, 'raw');
    this.rawWriteStream = fs.createWriteStream(path.join(this.rawDir, 'rawInput.txt'), {
      flags: 'a',
      encoding: 'utf8',
    });
  }

  listPorts() {
    SerialPort.list((error, results) => {
      if (error) {
        this.dispatchFunction({
          type: 'LOG_MESSAGE',
          payload: error,
        });
        return;
      }

      this.dispatchFunction({
        type: 'PORTS_AVAILABLE',
        payload: results.map(({ comName }) => comName),
      });
    });
  }

  closePort() {
    if (this.port) {
      this.port.close();
    }
    this.lines = [];
    this.port = null;
  }

  openPort(portConfig) {
    if (this.port) {
      this.dispatchFunction({
        type: 'LOG_MESSAGE',
        payload: 'Port already opened',
      });
      return;
    }

    if (
      !portConfig.comName ||
      !portConfig.baudRate ||
      !portConfig.dataBits ||
      !portConfig.stopBits ||
      !portConfig.parity
    ) {
      this.dispatchFunction({
        type: 'LOG_MESSAGE',
        payload: 'Portconfig is incomplete',
      });
      return;
    }

    try {
      this.port = new SerialPort(portConfig.comName, {
        baudRate: parseInt(portConfig.baudRate, 10),
        dataBits: parseInt(portConfig.dataBits, 10),
        stopBits: parseInt(portConfig.stopBits, 10),
        parity: portConfig.parity,
        autoOpen: true,
      });
    } catch (error) {
      this.dispatchFunction({
        type: 'LOG_MESSAGE',
        payload: `Error opening port: ${error.message}`,
      });
      return;
    }

    this.port.on('open', () => {
      this.dispatchFunction({
        type: 'LOG_MESSAGE',
        payload: 'Port opened',
      });
    });

    this.port.on('error', (error) => {
      this.port = null;
      this.dispatchFunction({
        type: 'LOG_MESSAGE',
        payload: `Port Error: ${error.message}`,
      });
    });

    this.port.on('close', () => {
      this.port = null;
      this.dispatchFunction({
        type: 'LOG_MESSAGE',
        payload: 'Port closed',
      });
    });

    const parser = this.port.pipe(new Readline({ delimiter: '\n' }));

    parser.on('data', (line) => {
      this.rawWriteStream.write(`${line}\n`);
      this.handleLine(line);
    });
  }

  handleLine(line) {

    if (!line.startsWith('!') && !line.startsWith('#')) {
      this.lines.push(line.replace(/[^0-9A-F]/ig, ''));
    } else {
      const command = line.startsWith('!') ? JSON.parse(line.slice(1).trim()) : {};

      switch (command.command) {
        case 'INIT':
          this.lines = [];
          break;
        case 'DATA':
          if (!command.more) {
            this.dispatchFunction({
              type: 'RAW_IMAGE_COMPLETE',
              payload: this.lines,
            });
          }
          break;
        default:
      }
      return;
    }

    this.dispatchFunction({
      type: 'LINE_RECEIVED',
      payload: this.lines.length,
    });
  }
}

export default PortHandler;
