import crypto from 'crypto';
import getImageFromLines from './getImageFromLines';
import transformImageValues from './transformImageValues';

class ImageParser {

  constructor(options) {
    this.options = Object.assign({
      onRow: (() => {}),
      onInit: (() => {}),
      onComplete: (() => {}),
      onCommand: (() => {}),
    }, options);

    this.lines = [];
    this.completeRawImage = [];
    this.completeImage = '';
    this.rowIndex = 0;
    this.counter = 0;
  }

  push(line, ...args) {

    if (!line.startsWith('!') && !line.startsWith('#')) {
      this.lines.push(line);
    } else {
      const command = line.startsWith('!') ? JSON.parse(line.slice(1).trim()) : {};

      switch (command.command) {
        case 'INIT':
          this.lines = [];
          this.completeRawImage = [];
          this.completeImage = '';
          this.rowIndex = 0;

          this.options.onInit();
          break;
        case 'DATA':
          if (!command.more) {
            const hash = crypto.createHash('sha1');
            hash.update(this.completeRawImage.join(''));

            this.options.onComplete({
              rawImage: this.completeRawImage,
              image: this.completeImage,
              hash: `${this.counter}_${hash.digest('hex')}`,
            });
            this.counter = (this.counter + 1) % 100;
          }
          break;
        default:
      }

      this.options.onCommand(command);
    }

    if (this.lines.length === 20) {
      const rawRow = getImageFromLines(this.lines);
      const row = this.options.pixelMap ? transformImageValues(rawRow, this.options.pixelMap) : null;
      this.lines = [];
      this.completeRawImage.push(...rawRow);

      if (row && row.length) {
        this.completeImage = `${this.completeImage}\n${row}`;
      }

      this.options.onRow({
        rowIndex: this.rowIndex,
        row,
        rawRow,
      });
      this.rowIndex += 1;
    }

    if (args.length) {
      args.forEach(arg => this.push(arg));
    }
  }
}

export default ImageParser;
