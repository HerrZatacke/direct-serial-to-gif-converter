import fs from 'fs';
import path from 'path';
import SerialPort from 'serialport';
import Readline from '@serialport/parser-readline';

class PortHandler {
  constructor(dispatch) {
    this.dispatchFunc = dispatch;
    this.port = null;
  }

  probePorts() {
    SerialPort.list((error, results) => {
      if (error) {
        this.dispatchFunc({
          type: 'LOG_MESSAGE',
          payload: error,
        });
        return;
      }

      this.dispatchFunc({
        type: 'PORTS_AVAILABLE',
        payload: results.map(({ comName }) => comName),
      });
    });
  }

  openPort(portConfig) {
    if (this.port) {
      this.dispatchFunc({
        type: 'LOG_MESSAGE',
        payload: 'Port already defined',
      });
      return;
    }

    try {
      this.port = new SerialPort(portConfig.comName, {
        baudRate: portConfig.baudRate,
        dataBits: portConfig.dataBits,
        stopBits: portConfig.stopBits,
        parity: portConfig.parity,
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
      this.port = null;
      this.dispatchFunc({
        type: 'LOG_MESSAGE',
        payload: `Port Error: ${error.message}`,
      });
    });

    this.port.on('close', () => {
      this.port = null;
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
