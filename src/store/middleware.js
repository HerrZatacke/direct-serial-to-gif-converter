import PortHandler from '../tools/serial/PortHandler';
import saveRawImage from './middleware/saveRawImage';
import getImageFromLines from '../tools/decode/getImageFromLines';

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
      case 'PROBE_PORTS':
        portHandler.probePorts();
        break;
      case 'PORTS_AVAILABLE':
        store.dispatch({
          type: 'SET_CONFIG',
          payload: {
            portConfig: {
              comName: action.payload[0] || '',
            },
          },
        });
        break;
      case 'RAW_IMAGE_COMPLETE':
        saveRawImage(action.payload)
          .then((filename) => {
            console.log(`${filename} created.`);
            console.log(getImageFromLines(action.payload));
          });
        break;
      default:
        break;
    }

    return next(action);
  };
};

export default middleware;
