import { applyMiddleware, compose, createStore } from 'redux';
import PersistState from './persistState';
import middleware from './middleware';
import reducers from './reducers';

const persistState = new PersistState();

const enhancers = [
  applyMiddleware(middleware),
  applyMiddleware(persistState.getMiddleware()),
];

const getStore = () => persistState.getPreloadedState()
  .then(preloadedState => (
    createStore(reducers, preloadedState, compose(...enhancers))
  ));

export default getStore;
