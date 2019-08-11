const lineReducer = (line = '', action) => {
  switch (action.type) {
    case 'LINE_RECEIVED':
      return action.payload;
    default:
      return line;
  }
};

export default lineReducer;
