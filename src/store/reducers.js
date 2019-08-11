import { combineReducers } from 'redux';
import config from './reducers/configReducer';
import line from './reducers/lineReducer';
import logMessages from './reducers/logMessagesReducer';

export default combineReducers({
  config,
  line,
  logMessages,
});
