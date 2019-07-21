const fs = require('fs');
const path = require('path');
const ImageParser = require('./ImageParser');
const createGif = require('./createGif');

// const colorMap = [/*' ',*/ '░', '▒', '▓', '█'];
// const colorMap = ['█', '▓', '▒', '░'];

fs.readFile(path.join(process.cwd(), 'dump.txt'), { encoding: 'utf8' }, (err, data) => {
  if (err) {
    process.exit();
  }

  const imageParser = new ImageParser({
    onComplete: ({ rawImage, hash }) => {
      fs.writeFileSync(path.join(process.cwd(), 'out', `${hash}.gif`), createGif(rawImage));
      // console.log(image);
    },
    // colorMap: ['  ', '▄ ', '▀▄', '██'],
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
