import React from 'react';
import blessed from 'neo-blessed';
import { createBlessedRenderer } from 'react-blessed';
import App from './components/App';
import sizeAndGrid from './tools/screen/sizeAndGrid';

const render = createBlessedRenderer(blessed);

const initApp = (store, screen) => {
  screen.on('resize', () => {
    store.dispatch({
      type: 'SCREEN_RESIZE',
      payload: sizeAndGrid(screen),
    });
  });

  const keys = ['escape', 'f1', 'f2', 'f3', 'f4', 'f5', 'f6', 'f7', 'f8', 'f9', 'f10', 'f11', 'f12'];

  screen.key(keys, (_, key) => {
    const shouldReRender = store.dispatch({
      type: 'MENU_KEYPRESS',
      payload: key.name,
    });

    if (shouldReRender) {
      screen.alloc();
      screen.render();
    }
  });

  render(<App store={store} />, screen);
};

export default initApp;
