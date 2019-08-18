const activeModuleReducer = (activeModule = '', action) => {
  switch (action.type) {
    case 'SET_MENU_OPTIONS':
      try {
        return action.payload.find(({ isActive }) => isActive).menuAction;
      } catch (error) {
        return '';
      }
    default:
      return activeModule;
  }
};

export default activeModuleReducer;
