const fs = require('fs');
const path = require('path');
const SerialPort = require('serialport');
const ImageParser = require('./ImageParser');
const createGif = require('./createGif');
const { portConfig } = require('../config');

// const colorMap = [/*' ',*/ '░', '▒', '▓', '█'];
// const colorMap = ['█', '▓', '▒', '░'];

const imageParser = new ImageParser({
  onComplete: ({ rawImage, hash }) => {
    const filePath = path.join(process.cwd(), 'out', `${hash}.gif`);
    fs.writeFileSync(filePath, createGif(rawImage));
    console.info(`${filePath} written.`);
  },
  // onRow: ({ row }) => {
  //   console.log(row);
  // },
  // colorMap: ['  ', '▄ ', '▀▄', '██'],
});

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
  console.info('port opened');
  // setTimeout(() => {
  //   port.write('something?');
  // }, 1500);
});

port.on('error', (error) => {
  console.error(error);
  process.exit();
});


let data = '';
port.on('readable', () => {
  data = `${data}${port.read().toString()}`;

  const rawLines = data.split('\n');

  if (rawLines.length > 1) {
    data = rawLines.pop();
    imageParser.push(...rawLines);
  }
});


