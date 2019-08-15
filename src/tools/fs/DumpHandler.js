import fs from 'fs';
import LineHandler from '../raw/LineHandler';

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

      this.lineHandler.handleLine('!{"command":"INIT"}');

      fileContent.split('\n')
        .forEach((line) => {
          this.lineHandler.handleLine(line);
        });

      this.lineHandler.handleLine('!{"command":"DATA","compressed":0,"more":0}');
    } else {
      this.dispatchFunction({
        type: 'LOG_MESSAGE',
        payload: `${fileOrFolder} is not file or folder`,
      });
    }
  }


}

export default DumpHandler;
