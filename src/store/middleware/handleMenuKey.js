import mainMenuButtons from '../../static/mainMenuButtons';

const handleMenuKey = dispatch => (key) => {
  if (key === 'escape') {
    dispatch({
      type: 'SET_ACTIVE_MODULE',
      payload: '',
    });
    return true;
  }

  const menuOptions = mainMenuButtons.map(option => ({
    ...option,
    isActive: option.sendKey === key,
  }));

  dispatch({
    type: 'SET_MENU_OPTIONS',
    payload: menuOptions,
  });

  return true;
};

export default handleMenuKey;
