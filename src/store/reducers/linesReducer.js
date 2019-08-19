const linesReducer = (lines = 0, action) => {
  switch (action.type) {
    case 'LINE_RECEIVED':
      return action.payload;
    case 'RAW_IMAGE_COMPLETE':
      return 0;
    default:
      return lines;
  }
};

export default linesReducer;
