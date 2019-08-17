import React from 'react';
import { render } from 'react-blessed';
import App from './components/App';
import mainMenuButtons from './mainMenuButtons';
import sizeAndGrid from './tools/screen/sizeAndGrid';

const initApp = (store, screen) => {
  screen.on('resize', () => {
    store.dispatch({
      type: 'SCREEN_RESIZE',
      payload: sizeAndGrid(screen),
    });
  });

  const keys = ['escape', ...mainMenuButtons.filter(({ moduleId }) => moduleId).map(({ key }) => `f${key}`)];

  screen.key(keys, (_, key) => {
    const fIndex = parseInt(key.name.replace(/[^\d]/g, ''), 10) - 1;
    const activeModule = mainMenuButtons[fIndex];

    store.dispatch({
      type: 'SET_ACTIVE_MODULE',
      payload: activeModule ? activeModule.moduleId : '',
    });

    screen.alloc();
    screen.render();
    // screen.focusNext();
  });

  render(<App store={store} />, screen);
};

export default initApp;
