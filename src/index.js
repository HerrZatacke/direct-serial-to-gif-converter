import blessed from 'blessed';
import './tools/inspectLogger';
import getStore from './store';
import initApp from './initApp';

const screen = blessed.screen({
  autoPadding: true,
  smartCSR: true,
  tabSize: 2,
  dockBorders: true,
  cursor: {
    artificial: true,
    shape: 'block',
    blink: true,
    color: '#ffffff',
  },
});

const focusNext = () => {
  const keyables = screen.keyable;
  const nextFocusIndex = (keyables.findIndex(({ focused }) => focused) + 1) % keyables.length;
  keyables[nextFocusIndex].focus();
};

screen.key('C-c', () => process.exit(0));
screen.key('tab', focusNext);

getStore(screen).then((store) => {
  global.store = store;
  global.screen = screen;
  initApp(store, screen);
});
