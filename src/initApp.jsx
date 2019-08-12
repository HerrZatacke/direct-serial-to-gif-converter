import React from 'react';
import { render } from 'react-blessed';
import App from './components/App';

const initApp = (store, screen) => {
  screen.on('resize', () => {
    store.dispatch({
      type: 'SCREEN_RESIZE',
      payload: {
        width: screen.width,
        height: screen.height,
      },
    });
  });

  screen.key(['f1', 'f2'], (_, key) => {
    console.log(key);
  });

  render(<App store={store} />, screen);
};

export default initApp;
