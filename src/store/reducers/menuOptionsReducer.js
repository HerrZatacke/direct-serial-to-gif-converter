import mainMenuButtons from '../../static/mainMenuButtons';

const menuOptionsReducer = (menuOptions = mainMenuButtons, action) => {
  switch (action.type) {
    case 'SET_MENU_OPTIONS':
      return action.payload;
    default:
      return menuOptions;
  }
};

export default menuOptionsReducer;
