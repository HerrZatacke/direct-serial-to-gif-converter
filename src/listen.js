const fs = require('fs');
const path = require('path');
const mkdirp = require('mkdirp');
const sanitizeFilename = require('sanitize-filename');
const ImageParser = require('./ImageParser');
const createGif = require('./createGif');
const SerialPort = require('serialport');
const { portConfig } = require('../config');
const palettes = require('./palettes');

const outDir = path.join(process.cwd(), 'out');
// const pixelMap = [/*' ',*/ '░', '▒', '▓', '█'];
// const pixelMap = ['█', '▓', '▒', '░'];

const imageParser = new ImageParser({
  onComplete: ({ rawImage, hash }) => {
    mkdirp(outDir, (error) => {
      if (error) {
        process.exit();
        return;
      }
      const filePath = path.join(outDir, `${hash}.gif`);

      palettes.forEach(({ name, palette }) => {
        fs.writeFileSync(path.join(outDir, `${hash}_${sanitizeFilename(name)}.gif`), createGif(rawImage, {
          scale: 4,
          palette,
        }));
      });

      console.info(`${filePath} written.`);
    });
    // console.log(image);
  },
  // onRow: ({ row }) => {
  //   console.log(row);
  // },
  // pixelMap: ['  ', '▄ ', '▀▄', '██'],
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


