import path from 'path';
import fs from 'fs';
import open from 'open';
import PortHandler from '../tools/serial/PortHandler';
import saveRawImage from './middleware/saveRawImage';
import getImageFromLines from '../tools/decode/getImageFromLines';
import createGif from '../tools/imageCreation/createGif';

const middleware = (store) => {

  const portHandler = new PortHandler(store.dispatch);

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
      case 'OPEN_PORT':
        portHandler.openPort(state.config.portConfig);
        break;
      case 'LIST_PORTS':
        portHandler.listPorts();
        break;
        case 'RAW_IMAGE_COMPLETE':
        saveRawImage(action.payload)
          .then(({ filename, hash }) => {
            store.dispatch({
              type: 'LOG_MESSAGE',
              payload: `${path.basename(filename)} created`,
            });

            // throw a gif into the raw folder, just to have somethiong to look at...
            const tmpFile = path.join(process.cwd(), 'out', 'raw', `${hash}.gif`);
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
