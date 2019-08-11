import React from 'react';
import { render } from 'react-blessed';
import App from './components/App';

const initApp = (store, screen) => {
  render(<App store={store} />, screen);
};

export default initApp;
