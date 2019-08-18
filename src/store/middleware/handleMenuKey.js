import mainMenuButtons from '../../static/mainMenuButtons';

const handleMenuKey = dispatch => (key) => {
  if (key.name === 'escape') {
    dispatch({
      type: 'SET_ACTIVE_MODULE',
      payload: '',
    });
  } else {
    const fIndex = parseInt(key.name.replace(/[^\d]/g, ''), 10) - 1;
    const activeModule = mainMenuButtons[fIndex];

    if (!activeModule || !activeModule.moduleId) {
      return false;
    }

    dispatch({
      type: 'SET_ACTIVE_MODULE',
      payload: activeModule.moduleId,
    });
  }

  return true;
};

export default handleMenuKey;
