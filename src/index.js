const fs = require('fs');
const path = require('path');
const mkdirp = require('mkdirp');
const ImageParser = require('./ImageParser');
const createGif = require('./createGif');

const outDir = path.join(process.cwd(), 'out');
// const pixelMap = [/*' ',*/ '░', '▒', '▓', '█'];
// const pixelMap = ['█', '▓', '▒', '░'];

fs.readFile(path.join(process.cwd(), 'dump.txt'), { encoding: 'utf8' }, (err, data) => {
  if (err) {
    process.exit();
  }

  const imageParser = new ImageParser({
    onComplete: ({ rawImage, hash }) => {
      mkdirp(outDir, (error) => {
        if (error) {
          process.exit();
          return;
        }
        fs.writeFileSync(path.join(outDir, `${hash}.gif`), createGif(rawImage, {
          scale: 200,
        }));
      });
      // console.log(image);
    },
    // pixelMap: ['  ', '▄ ', '▀▄', '██'],
  });

  const rawLines = data.split('\n');

  // const sendLine = (rawLines) => {
  //   const line = rawLines.shift();
  //   if (line) {
  //     setTimeout(() => {
  //       imageParser.push(line);
  //       sendLine(rawLines);
  //     }, 50);
  //   }
  // };
  //
  // sendLine(rawLines);

  imageParser.push(...rawLines);

});
