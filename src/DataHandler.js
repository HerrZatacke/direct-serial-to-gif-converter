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
    this.animatedDir = path.join(this.outDir, 'animated');
    this.rawDir = path.join(this.outDir, 'raw');
    // const pixelMap = [/*' ',*/ '░', '▒', '▓', '█'];
    // const pixelMap = ['█', '▓', '▒', '░'];

    this.gifAnimator = new GifAnimator({
      width: 160,
      height: 144,
      scale: 4,
      palette: palettes[1].palette,
      delay: 8, // in 1/10th of a second
    });

    mkdirp(this.rawDir, (error) => {
      if (error) {
        process.exit();
        return;
      }
      this.rawWriteStream = fs.createWriteStream(path.join(this.rawDir, `${(new Date()).valueOf()}.txt`), {
        flags: 'a',
        encoding: 'utf8',
      });
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
    rawLines.forEach((line) => {
      this.rawWriteStream.write(`${line}\n`);
    });
    this.imageParser.push(...rawLines);
  }

  done() {
    mkdirp(this.animatedDir, (error) => {
      if (error) {
        process.exit();
        return;
      }
      const { buffer, hash } = this.gifAnimator.finalize();
      fs.writeFileSync(path.join(this.animatedDir, `${hash}.gif`), buffer);
      process.exit();
    });
  }
}

module.exports = DataHandler;
