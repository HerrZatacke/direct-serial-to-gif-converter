import PortHandler from '../store/middleware/PortHandler';

const middleware = (store) => {

  const portHandler = new PortHandler(store.dispatch);

  return next => (action) => {

    const state = store.getState();
    // console.log(state);

    // eslint-disable-next-line no-console
    console.log(action);

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
      default:
        break;
    }

    return next(action);
  };
};

export default middleware;
