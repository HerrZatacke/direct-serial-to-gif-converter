import { combineReducers } from 'redux';
import activeModule from './reducers/activeModuleReducer';
import activeSubModule from './reducers/activeSubModuleReducer';
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
  activeSubModule,
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
