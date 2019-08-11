import fs from 'fs';
import path from 'path';
import mkdirp from 'mkdirp';
import sanitizeFilename from 'sanitize-filename';
import ImageParser from '../decode/ImageParser';
import createGif from './createGif';
import GifAnimator from './GifAnimator';
import palettes from '../../../res/palettes';

const spinChars = ['/', '-', '\\', '|'];

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
      palette: palettes[0].palette,
      delay: 12, // in 1/10th of a second
    });

    mkdirp.sync(this.rawDir);
    this.rawWriteStream = fs.createWriteStream(path.join(this.rawDir, `${(new Date()).valueOf()}.txt`), {
      flags: 'a',
      encoding: 'utf8',
    });

    this.imageParser = new ImageParser({
      printImageCount: false, // set to true for easier animation debugging?
      onComplete: ({ rawImage, hash }) => {

        palettes.forEach(({ name, palette }) => {
          const imageBuffer = createGif(rawImage, {
            scale: 4,
            palette,
          });

          const paletteDir = path.join(this.outDir, 'single', sanitizeFilename(name));

          if (imageBuffer) {
            mkdirp.sync(paletteDir);
            fs.writeFileSync(path.join(paletteDir, `${hash}.gif`), imageBuffer);
          }

        });
        process.stdout.write(`${hash}.gif done\r\n`);
        this.gifAnimator.addFrame(rawImage);
        // console.log(image);
      },
      onRow: ({ row }) => {
        const spinChar = spinChars.pop();
        process.stdout.write(`${spinChar}\r`);
        spinChars.unshift(spinChar);
        //   console.log(row);
      },
      // pixelMap: ['██', '▀▄', '▄ ', '  '],
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
    mkdirp.sync(this.animatedDir);
    const { buffer, hash } = this.gifAnimator.finalize();
    fs.writeFileSync(path.join(this.animatedDir, `${hash}.gif`), buffer);
    process.exit();
  }
}

export default DataHandler;
