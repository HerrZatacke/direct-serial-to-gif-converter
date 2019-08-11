import { combineReducers } from 'redux';
import config from './reducers/configReducer';
import lines from './reducers/linesReducer';
import logMessages from './reducers/logMessagesReducer';
import availablePorts from './reducers/availablePortsReducer';

export default combineReducers({
  availablePorts,
  config,
  lines,
  logMessages,
});
