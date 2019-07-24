const fs = require('fs');
const path = require('path');
const mkdirp = require('mkdirp');
const sanitizeFilename = require('sanitize-filename');
const ImageParser = require('./ImageParser');
const createGif = require('./createGif');
const GifAnimator = require('./GifAnimator');

const palettes = require('./palettes');

class DataHandler {
  constructor() {

    this.outDir = path.join(process.cwd(), 'out');
    // const pixelMap = [/*' ',*/ '░', '▒', '▓', '█'];
    // const pixelMap = ['█', '▓', '▒', '░'];

    this.gifAnimator = new GifAnimator({
      width: 160,
      height: 144,
      scale: 4,
      palette: palettes[1].palette,
      delay: 8, // in 1/10th of a second
    });

    this.imageParser = new ImageParser({
      onComplete: ({ rawImage, hash }) => {
        mkdirp(this.outDir, (error) => {
          if (error) {
            process.exit();
            return;
          }

          palettes.forEach(({ name, palette }) => {
            const imageBuffer = createGif(rawImage, {
              scale: 4,
              palette,
            });

            if (imageBuffer) {
              fs.writeFileSync(path.join(this.outDir, `${hash}_${sanitizeFilename(name)}.gif`), imageBuffer);
            }
          });

          this.gifAnimator.addFrame(rawImage);
        });
        // console.log(image);
      },
      // onRow: ({ row }) => {
      //   console.log(row);
      // },
      // pixelMap: ['  ', '▄ ', '▀▄', '██'],
    });
  }

  push(rawLines) {
    this.imageParser.push(...rawLines);
  }

  done() {
    const gifDir = path.join(this.outDir, 'animated');
    mkdirp(gifDir, (error) => {
      if (error) {
        process.exit();
        return;
      }
      const { buffer, hash } = this.gifAnimator.finalize();
      fs.writeFileSync(path.join(gifDir, `${hash}.gif`), buffer);
      process.exit();
    });
  }
}

module.exports = DataHandler;
