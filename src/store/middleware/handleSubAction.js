import exportImages from './exportImages';
import exportAnimation from './exportAnimation';

const handleSubAction = ({
  logDbError,
  dispatch,
}) => (actionName, state) => {
  switch (actionName) {
    case 'SINGLE_FILES':
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
    case 'ANIMATION':
      if (!state.selectedImages.length) {
        break;
      }
      exportAnimation(state)
        .then((frames) => {
          dispatch({
            type: 'LOG_MESSAGE',
            payload: `Animation with ${frames} frames done`,
          });
        })
        .catch(logDbError);
      break;
    // possible other cases that open overlayed windows...
    case 'EXPORT_OPTIONS':
      dispatch({
        type: 'SET_SUB_MODULE',
        payload: actionName,
      });
      break;
    default:
      break;
  }
};

export default handleSubAction;
