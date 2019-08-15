class LineHandler {
  constructor(dispatch) {
    this.dispatchFunction = dispatch;
    this.lines = [];
  }

  reset() {
    this.lines = [];
  }

  getLineCount() {
    return this.lines.length;
  }

  static getCommand(line) {
    try {
      return Object.assign({}, JSON.parse(line.slice(1).trim()));
    } catch (error) {
      return {};
    }
  }

  handleLine(line) {
    if (!line.startsWith('!') && !line.startsWith('#')) {
      const cleanedLine = line.replace(/[^0-9A-F]/ig, '');
      if (cleanedLine.length === 32) {
        this.lines.push(cleanedLine);
      }
    } else {
      const command = this.getCommand(line);

      switch (command.command) {
        case 'INIT':
          this.lines = [];
          break;
        case 'DATA':
          if (this.lines.length && !command.more) {
            this.dispatchFunction({
              type: 'RAW_IMAGE_COMPLETE',
              payload: this.lines,
            });
          }
          break;
        default:
      }
    }
  }
}

export default LineHandler;
