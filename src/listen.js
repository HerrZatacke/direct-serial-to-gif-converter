const SerialPort = require('serialport');
const DataHandler = require('./DataHandler');
const { portConfig } = require('../config');

const dataHandler = new DataHandler();

let port;
try {
  port = new SerialPort(portConfig.comName, {
    baudRate: portConfig.baudRate,
    dataBits: portConfig.dataBits,
    stopBits: portConfig.stopBits,
    autoOpen: portConfig.autoOpen,
    parity: portConfig.parity,
  });
} catch (error) {
  console.error(error);
  process.exit();
}

port.on('open', () => {
  console.info('port opened - waiting for data');
});

port.on('error', (error) => {
  console.error(error.message);
});

port.on('close', () => {
  dataHandler.done();
});

let inactivityDelay = null;
let data = '';
port.on('readable', () => {
  data = `${data}${port.read().toString()}`;

  const rawLines = data.split('\n');

  if (rawLines.length > 1) {
    data = rawLines.pop();
    dataHandler.push(rawLines);
  }

  global.clearTimeout(inactivityDelay);
  inactivityDelay = global.setTimeout(() => {
    console.info('no data in the last 5s - quitting....');
    port.close(() => {
      console.info('port closed');
    });
  }, 5000);

});
