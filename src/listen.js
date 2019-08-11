const SerialPort = require('serialport');
const DataHandler = require('./tools/imageCreation/DataHandler');
const { portConfig } = require('../config');

const dataHandler = new DataHandler();

let port;
try {
  port = new SerialPort(portConfig.comName, {
    baudRate: portConfig.baudRate,
    dataBits: portConfig.dataBits,
    stopBits: portConfig.stopBits,
    autoOpen: true,
    parity: portConfig.parity,
  });
} catch (error) {
  console.error(error);
  process.exit();
}

port.on('open', () => {
  console.info('port opened - waiting for data\nTo correctly create animated files, disconnect the port before closing program');
});

port.on('error', (error) => {
  console.error(error.message);
});

port.on('close', () => {
  console.info('port closed...');
  dataHandler.done();
});

let data = '';
port.on('readable', () => {
  data = `${data}${port.read().toString()}`;

  const rawLines = data.split('\n');

  if (rawLines.length > 1) {
    data = rawLines.pop();
    dataHandler.push(rawLines);
  }
});
