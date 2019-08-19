const screenSizeReducer = (screenSize = {}, action) => {
  switch (action.type) {
    case 'SCREEN_RESIZE':
      return action.payload;
    default:
      return screenSize;
  }
};

export default screenSizeReducer;
