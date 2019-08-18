import mainMenuButtons from '../../static/mainMenuButtons';

const handleMenuKey = dispatch => (key, { activeModule }) => {
  if (key === 'escape') {
    dispatch({
      type: 'SET_MENU_OPTIONS',
      payload: mainMenuButtons,
    });
    return true;
  }

  const currentActive = mainMenuButtons.find(({ menuAction }) => menuAction === activeModule) || false;
  const triggeredSub = (currentActive.actions || []).find(({ sendKey }) => sendKey === key);

  if (triggeredSub) {
    dispatch({
      type: 'TRIGGERED_SUB_ACTION',
      payload: triggeredSub.menuAction,
    });
    return true;
  }

  const menuOptions = mainMenuButtons.map(option => ({
    ...option,
    isActive: option.sendKey === key,
  }));

  const activeOption = menuOptions.find(({ isActive }) => isActive);
  const subActions = activeOption && activeOption.actions ? activeOption.actions : [];

  if (!activeOption) {
    return false;
  }

  dispatch({
    type: 'SET_MENU_OPTIONS',
    payload: [...menuOptions, ...subActions],
  });

  return true;
};

export default handleMenuKey;
