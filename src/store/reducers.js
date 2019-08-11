import { combineReducers } from 'redux';
import config from './reducers/configReducer';
import line from './reducers/lineReducer';
import logMessages from './reducers/logMessagesReducer';
import availablePorts from './reducers/availablePortsReducer';

export default combineReducers({
  availablePorts,
  config,
  line,
  logMessages,
});
