import { applyMiddleware, compose, createStore } from 'redux';
import persistState from './persistState';
import middleware from './middleware';
import reducers from './reducers';

const enhancers = [
  applyMiddleware(middleware),
  applyMiddleware(persistState),
];

const getStore = preloadedState => (
  createStore(reducers, preloadedState, compose(...enhancers))
);


module.exports = getStore;
