const activeSubModuleReducer = (activeSubModule = '', action) => {
  switch (action.type) {
    case 'SET_SUB_MODULE':
      return action.payload;
    case 'SET_MENU_OPTIONS':
      return '';
    case 'TRIGGERED_SUB_ACTION':
      switch (action.payload) {
        case 'SINGLE_FILES':
          return '';
        default:
          return activeSubModule;
      }
    default:
      return activeSubModule;
  }
};

export default activeSubModuleReducer;
