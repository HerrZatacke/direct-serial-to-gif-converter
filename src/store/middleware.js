import PortHandler from '../tools/serial/PortHandler';
import DumpHandler from '../tools/fs/DumpHandler';
import ImageDb from './ImageDb';
import getHandleMenuKey from './middleware/handleMenuKey';
import getHandleActiveModuleChange from './middleware/handleActiveModuleChange';
import getHandleSubAction from './middleware/handleSubAction';

const middleware = (store) => {

  const portHandler = new PortHandler(store.dispatch);
  const dumpHandler = new DumpHandler(store.dispatch);
  const imageDb = new ImageDb();

  const logDbError = (error) => {
    store.dispatch({
      type: 'LOG_MESSAGE',
      payload: error.message,
    });
  };

  const handleMenuKey = getHandleMenuKey(store.dispatch);
  const handleActiveModuleChange = getHandleActiveModuleChange({
    portHandler,
    dumpHandler,
    imageDb,
    logDbError,
    dispatch: store.dispatch,
  });

  const handleSubAction = getHandleSubAction({
    logDbError,
    dispatch: store.dispatch,
  });

  return next => (action) => {

    const state = store.getState();
    // console.log(state);

    if (
      action.type === 'TRIGGERED_SUB_ACTION'
    ) {
      // eslint-disable-next-line no-console
      console.log(action);
    }

    switch (action.type) {
      case 'MENU_KEYPRESS':
        return handleMenuKey(action.payload, state);
      case 'SET_MENU_OPTIONS':
        handleActiveModuleChange(action.payload, state);
        break;
      case 'TRIGGERED_SUB_ACTION':
        handleSubAction(action.payload, state);
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
          .catch(logDbError);
        break;
      default:
        break;
    }

    return next(action);
  };
};

export default middleware;
