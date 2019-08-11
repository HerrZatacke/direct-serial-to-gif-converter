import fs from 'fs';
import path from 'path';
import SerialPort from 'serialport';
import Readline from '@serialport/parser-readline';
// eslint-disable-next-line import/extensions
import { portConfig } from '../../../config';

class PortHandler {
  constructor(dispatch) {
    this.dispatchFunc = dispatch;
    this.portConfig = portConfig;
    this.port = null;
  }

  openPort() {
    if (this.port) {
      this.dispatchFunc({
        type: 'LOG_MESSAGE',
        payload: 'Port already defined',
      });
      return;
    }

    try {
      this.port = new SerialPort(this.portConfig.comName, {
        baudRate: this.portConfig.baudRate,
        dataBits: this.portConfig.dataBits,
        stopBits: this.portConfig.stopBits,
        parity: this.portConfig.parity,
        autoOpen: true,
      });
    } catch (error) {
      console.error(error);
      process.exit();
    }

    this.port.on('open', () => {
      this.dispatchFunc({
        type: 'LOG_MESSAGE',
        payload: 'Port opened',
      });
    });

    this.port.on('error', (error) => {
      this.dispatchFunc({
        type: 'LOG_MESSAGE',
        payload: `Port Error: ${error.message}`,
      });
    });

    this.port.on('close', () => {
      this.dispatchFunc({
        type: 'LOG_MESSAGE',
        payload: 'Port closed',
      });
    });

    const parser = this.port.pipe(new Readline({ delimiter: '\n' }));
    const out = fs.createWriteStream(path.join(process.cwd(), 'out.txt'), { flags: 'a' });

    parser.on('data', (line) => {

      out.write(`${line}\n`);

      this.dispatchFunc({
        type: 'LINE_RECEIVED',
        payload: line,
      });
    });

  }
}

export default PortHandler;
