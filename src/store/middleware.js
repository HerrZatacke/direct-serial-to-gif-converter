import PortHandler from '../store/middleware/PortHandler';

const middleware = (store) => {

  const portHandler = new PortHandler(store.dispatch);

  return next => (action) => {

    // const state = store.getState();
    // console.log(state);

    // eslint-disable-next-line no-console
    console.log(action);

    switch (action.type) {
      case 'OPEN_PORT':
        portHandler.openPort();
        break;
      default:
        break;
    }

    return next(action);
  };
};

export default middleware;
