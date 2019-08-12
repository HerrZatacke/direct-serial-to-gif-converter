import { applyMiddleware, compose, createStore } from 'redux';
import PersistState from './persistState';
import middleware from './middleware';
import reducers from './reducers';

const persistState = new PersistState();

const enhancers = [
  applyMiddleware(middleware),
  applyMiddleware(persistState.getMiddleware()),
];

const getStore = (screen) => {
  const screenSize = {
    width: screen.width,
    height: screen.height,
  };

  return persistState.getPreloadedState()
    .then(preloadedState => (
      createStore(reducers, Object.assign({ screenSize }, preloadedState), compose(...enhancers))
    ));
};

export default getStore;
