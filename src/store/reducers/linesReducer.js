const linesReducer = (line = '', action) => {
  switch (action.type) {
    case 'IMAGE_ROW':
      return action.payload;
    case 'IMAGE_COMPLETE':
      return 18;
    default:
      return line;
  }
};

export default linesReducer;
