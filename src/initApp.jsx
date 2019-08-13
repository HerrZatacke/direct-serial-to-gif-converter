import React from 'react';
import { render } from 'react-blessed';
import App from './components/App';
import mainMenuButtons from './mainMenuButtons';

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
  });

  render(<App store={store} />, screen);
};

export default initApp;
