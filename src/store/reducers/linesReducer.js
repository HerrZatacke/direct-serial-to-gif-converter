const linesReducer = (line = '', action) => {
  switch (action.type) {
    case 'LINE_RECEIVED':
      return action.payload;
    case 'RAW_IMAGE_COMPLETE':
      return 0;
    default:
      return line;
  }
};

export default linesReducer;
