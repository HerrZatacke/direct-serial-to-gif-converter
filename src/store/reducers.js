import { combineReducers } from 'redux';
import line from './reducers/lineReducer';
import logMessages from './reducers/logMessagesReducer';

module.exports = combineReducers({
  line,
  logMessages,
});
