const activeSubModuleReducer = (activeSubModule = '', action) => {
  switch (action.type) {
    case 'SET_SUB_MODULE':
      return action.payload;
    case 'SET_MENU_OPTIONS':
      return '';
    default:
      return activeSubModule;
  }
};

export default activeSubModuleReducer;
