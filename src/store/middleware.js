import path from 'path';
import fs from 'fs';
import mkdirp from 'mkdirp';
import open from 'open';
import PortHandler from '../tools/serial/PortHandler';
import DumpHandler from '../tools/fs/DumpHandler';
import saveRawImage from './middleware/saveRawImage';
import getImageFromLines from '../tools/decode/getImageFromLines';
import createGif from '../tools/imageCreation/createGif';

const middleware = (store) => {

  const portHandler = new PortHandler(store.dispatch);
  const dumpHandler = new DumpHandler(store.dispatch);

  return next => (action) => {

    const state = store.getState();
    // console.log(state);

    if (
      action.type !== 'LINE_RECEIVED'
    ) {
      // eslint-disable-next-line no-console
      console.log(action);
    }

    switch (action.type) {
      case 'SET_ACTIVE_MODULE':
        portHandler.closePort();
        switch (action.payload) {
          case 'OPEN_PORT':
            portHandler.openPort(state.config.portConfig);
            break;
          case 'CONFIG_PORT':
            portHandler.listPorts();
            break;
          case 'RAW_DUMPS':
            dumpHandler.open(state.dumpDir);
            break;
          default:
        }
        break;
      case 'SELECT_DUMP_DIR_FILE':
        dumpHandler.open(action.payload);
        break;
      case 'RAW_IMAGE_COMPLETE':
        saveRawImage(action.payload)
          .then(({ filename, hash }) => {
            store.dispatch({
              type: 'LOG_MESSAGE',
              payload: `${path.basename(filename)} created`,
            });

            // throw a gif into the raw folder, just to have somethiong to look at...
            const tmpDir = path.join(process.cwd(), 'out', 'raw', 'gif');
            mkdirp.sync(path.join(tmpDir));
            const tmpFile = path.join(tmpDir, `${hash}.gif`);
            fs.writeFileSync(tmpFile, createGif(getImageFromLines(action.payload), { scale: 4 }));
            open(tmpFile);
          });
        break;
      default:
        break;
    }

    return next(action);
  };
};

export default middleware;
