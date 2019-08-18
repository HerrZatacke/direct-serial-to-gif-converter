import { combineReducers } from 'redux';
import activeModule from './reducers/activeModuleReducer';
import availablePorts from './reducers/availablePortsReducer';
import config from './reducers/configReducer';
import dumpDir from './reducers/dumpDirReducer';
import dumpDirContent from './reducers/dumpDirContentReducer';
import imageList from './reducers/imageListReducer';
import lines from './reducers/linesReducer';
import logMessages from './reducers/logMessagesReducer';
import menuOptions from './reducers/menuOptionsReducer';
import screenSize from './reducers/screenSizeReducer';
import selectedImages from './reducers/selectedImagesReducer';

export default combineReducers({
  activeModule,
  availablePorts,
  config,
  dumpDir,
  dumpDirContent,
  imageList,
  lines,
  logMessages,
  menuOptions,
  screenSize,
  selectedImages,
});
