import PortHandler from '../tools/serial/PortHandler';
import DumpHandler from '../tools/fs/DumpHandler';
import ImageDb from './ImageDb';
import exportImages from './middleware/exportImages';

const logDbError = store => (error) => {
  store.dispatch({
    type: 'LOG_MESSAGE',
    payload: error.message,
  });
};

const middleware = (store) => {

  const portHandler = new PortHandler(store.dispatch);
  const dumpHandler = new DumpHandler(store.dispatch);
  const imageDb = new ImageDb();

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
          case 'IMAGE_LIST':
            imageDb.list()
              .then((storedImages) => {
                store.dispatch({
                  type: 'SET_IMAGE_LIST',
                  payload: storedImages,
                });
              })
              .catch(logDbError(store));
            break;
          case 'EXPORT_SELECTED':
            if (!state.selectedImages.length) {
              break;
            }
            exportImages(state)
              .then((writtenFiles) => {
                store.dispatch({
                  type: 'LOG_MESSAGE',
                  payload: `${writtenFiles.length} files written`,
                });
              })
              .catch(logDbError(store));
            break;
          default:
        }
        break;
      case 'SELECT_DUMP_DIR_FILE':
        dumpHandler.open(action.payload);
        break;
      case 'RAW_IMAGE_COMPLETE':
        imageDb.update(action.payload)
          .then((message) => {
            store.dispatch({
              type: 'LOG_MESSAGE',
              payload: message,
            });
          })
          .catch(logDbError(store));
        break;
      default:
        break;
    }

    return next(action);
  };
};

export default middleware;
