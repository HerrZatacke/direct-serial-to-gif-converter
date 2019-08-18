import blessed from 'neo-blessed';
import './tools/inspectLogger';
import getStore from './store';
import initApp from './initApp';

// clean the debug window
// eslint-disable-next-line no-console
console.clear();

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

screen.key('C-c', () => process.exit(0));
screen.key(['tab', 'right'], screen.focusNext);
screen.key(['left'], screen.focusPrev);

getStore(screen).then((store) => {
  global.store = store;
  global.screen = screen;
  initApp(store, screen);
});
