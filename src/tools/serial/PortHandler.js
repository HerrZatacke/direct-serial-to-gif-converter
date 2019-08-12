import fs from 'fs';
import path from 'path';
import SerialPort from 'serialport';
import Readline from '@serialport/parser-readline';

class PortHandler {
  constructor(dispatch) {
    this.dispatchFunction = dispatch;
    this.port = null;
    this.lines = [];
    this.lineCount = 0;
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

  openPort(portConfig) {
    if (this.port) {
      this.dispatchFunction({
        type: 'LOG_MESSAGE',
        payload: 'Port already opened',
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
      console.error(error);
      process.exit();
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
    const out = fs.createWriteStream(path.join(process.cwd(), 'out.txt'), { flags: 'a' });

    parser.on('data', (line) => {
      out.write(`${line}\n`);
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
