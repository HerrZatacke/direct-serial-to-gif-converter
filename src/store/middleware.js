import PortHandler from '../tools/serial/PortHandler';
import ImageParser from '../tools/decode/ImageParser';

const middleware = (store) => {

  const portHandler = new PortHandler(store.dispatch);
  const imageParser = new ImageParser(store.dispatch);

  return next => (action) => {

    const state = store.getState();
    // console.log(state);

    if (
      action.type !== 'LINE_RECEIVED' &&
      action.type !== 'IMAGE_ROW'
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
      case 'LINE_RECEIVED':
        imageParser.push(action.payload);
        break;
      default:
        break;
    }

    return next(action);
  };
};

export default middleware;
