import exportImages from './exportImages';

const handleSubAction = ({
  logDbError,
  dispatch,
}) => (actionName, state) => {
  switch (actionName) {
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
      break;
  }
};

export default handleSubAction;
