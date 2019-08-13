const activeModuleReducer = (activeModule = '', action) => {
  switch (action.type) {
    case 'SET_ACTIVE_MODULE':
      return action.payload;
    default:
      return activeModule;
  }
};

export default activeModuleReducer;
