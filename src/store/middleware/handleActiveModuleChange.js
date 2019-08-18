import exportImages from './exportImages';

const handleActiveModuleChange = ({
  portHandler,
  dumpHandler,
  imageDb,
  logDbError,
  dispatch,
}) => (payload, state) => {
  portHandler.closePort();

  const activeModule = payload.find(({ isActive }) => isActive);

  if (!activeModule) {
    return;
  }

  switch (activeModule.menuAction) {
    case 'OPEN_PORT':
      portHandler.openPort(state.config.portConfig);
      break;
    case 'CONFIG_PORT':
      portHandler.listPorts();
      break;
    case 'RAW_DUMPS':
      dumpHandler.open(state.dumpDir);
      break;
    case 'IMAGE_LIST':
      imageDb.list()
        .then((storedImages) => {
          dispatch({
            type: 'SET_IMAGE_LIST',
            payload: storedImages,
          });
        })
        .catch(logDbError);
      break;
    case 'EXPORT_SELECTED':
      if (!state.selectedImages.length) {
        break;
      }
      exportImages(state)
        .then((writtenFiles) => {
          dispatch({
            type: 'LOG_MESSAGE',
            payload: `${writtenFiles.length} files written`,
          });
        })
        .catch(logDbError);
      break;
    default:
  }
};

export default handleActiveModuleChange;
