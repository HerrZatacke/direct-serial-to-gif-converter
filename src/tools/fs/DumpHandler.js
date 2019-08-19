import fs from 'fs';
import LineHandler from '../raw/LineHandler';

const START_LINE = '!{"command":"INIT"}';
const STOP_LINE = '!{"command":"DATA","compressed":0,"more":0}';

const getDumpType = (lines) => {
  if (
    lines.length === 360 &&
    lines.filter(line => line.match(/^[a-f0-9]{32}$/i)).length === 360
  ) {
    return 'SINGLE_IMAGE';
  }

  if (
    lines.find(line => line.trim() === START_LINE) &&
    lines.find(line => line.trim() === STOP_LINE)
  ) {
    return 'RAW_DUMP';
  }

  return 'INVALID';
};

class DumpHandler {
  constructor(dispatch) {
    this.dispatchFunction = dispatch;
    this.lineHandler = new LineHandler(dispatch);
  }


  open(fileOrFolder) {
    const stats = fs.lstatSync(fileOrFolder);
    if (stats.isDirectory()) {
      this.dispatchFunction({
        type: 'CHANGE_DUMPDIR',
        payload: fileOrFolder,
      });
    } else if (stats.isFile()) {
      const fileContent = fs.readFileSync(fileOrFolder, { encoding: 'utf8' });
      const lines = fileContent.split(/[\r\n]/g);

      const dumpType = getDumpType(lines);

      switch (dumpType) {
        case 'INVALID':
          this.dispatchFunction({
            type: 'LOG_MESSAGE',
            payload: `${fileOrFolder} is not a valid dump file`,
          });
          break;
        case 'SINGLE_IMAGE':
          lines.unshift(START_LINE);
          lines.push(STOP_LINE);
          // eslint-disable-next-line no-fallthrough
        case 'RAW_DUMP':
          lines.forEach((line) => {
            this.lineHandler.handleLine(line);
          });
          break;
        default:
          break;
      }
    } else {
      this.dispatchFunction({
        type: 'LOG_MESSAGE',
        payload: `${fileOrFolder} is not file or folder`,
      });
    }
  }


}

export default DumpHandler;
