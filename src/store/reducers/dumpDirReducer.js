const dumpDirReducer = (dumpDir = process.cwd(), action) => {
  switch (action.type) {
    case 'CHANGE_DUMPDIR':
      return action.payload;
    default:
      return dumpDir;
  }
};

export default dumpDirReducer;
