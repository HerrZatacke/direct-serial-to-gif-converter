import blessed from 'blessed';
import './tools/inspectLogger';
import getStore from './store';
import initApp from './initApp';

const screen = blessed.screen({
  autoPadding: true,
  smartCSR: true,
});

const focusNext = () => {
  const keyables = screen.keyable;
  const nextFocusIndex = (keyables.findIndex(({ focused }) => focused) + 1) % keyables.length;
  keyables[nextFocusIndex].focus();
};

screen.key('C-c', () => process.exit(0));
screen.key('tab', focusNext);

getStore().then((store) => {
  global.store = store;
  global.screen = screen;
  initApp(store, screen);
});
