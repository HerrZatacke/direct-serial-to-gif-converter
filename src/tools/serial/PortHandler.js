import fs from 'fs';
import path from 'path';
import SerialPort from 'serialport';
import Readline from '@serialport/parser-readline';
import LineHandler from '../raw/LineHandler';

class PortHandler {
  constructor(dispatch) {
    this.dispatchFunction = dispatch;
    this.port = null;
    this.lineHandler = new LineHandler(dispatch);
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
    this.lineHandler.reset();
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
      this.lineHandler.handleLine(line);

      this.dispatchFunction({
        type: 'LINE_RECEIVED',
        payload: this.lineHandler.getLineCount(),
      });
    });
  }
}

export default PortHandler;
