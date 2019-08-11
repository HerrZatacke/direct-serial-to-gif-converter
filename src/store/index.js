const { createStore, applyMiddleware, compose } = require('redux');
const reducers = require('./reducers');
const middleware = require('./middleware');

const enhancers = [
  applyMiddleware(middleware),
];

const getStore = preloadedState => (
  createStore(reducers, preloadedState, compose(...enhancers))
);


module.exports = getStore;
