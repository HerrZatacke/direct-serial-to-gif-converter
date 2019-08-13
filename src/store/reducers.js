import { combineReducers } from 'redux';
import activeModule from './reducers/activeModuleReducer';
import availablePorts from './reducers/availablePortsReducer';
import config from './reducers/configReducer';
import lines from './reducers/linesReducer';
import logMessages from './reducers/logMessagesReducer';
import screenSize from './reducers/screenSizeReducer';

export default combineReducers({
  activeModule,
  availablePorts,
  config,
  lines,
  logMessages,
  screenSize,
});
