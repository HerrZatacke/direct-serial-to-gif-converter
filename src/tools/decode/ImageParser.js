import getImageFromLines from './getImageFromLines';

class ImageParser {

  constructor(dispatchFunction) {
    this.dispatchFunction = dispatchFunction;
    this.lines = [];
    this.completeRawImage = [];
    this.rowIndex = 0;
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
          this.rowIndex = 0;
          break;
        case 'DATA':
          if (!command.more) {
            this.dispatchFunction({
              type: 'IMAGE_COMPLETE',
              payload: this.completeRawImage,
            });
          }
          break;
        default:
      }
    }

    if (this.lines.length === 20) {
      const rawRow = getImageFromLines(this.lines);
      this.lines = [];
      this.completeRawImage.push(...rawRow);

      this.dispatchFunction({
        type: 'IMAGE_ROW',
        payload: this.rowIndex,
      });

      this.rowIndex += 1;
    }

    if (args.length) {
      args.forEach(arg => this.push(arg));
    }
  }
}

export default ImageParser;
