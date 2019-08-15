import folderContent from '../../tools/folderContent';

const dumpDirContentReducer = (dumpDirContent = [], action) => {
  switch (action.type) {
    case 'CHANGE_DUMPDIR':
      try {
        return folderContent(action.payload);
      } catch (error) {
        console.error(error);
        return [];
      }
    default:
      return dumpDirContent;
  }
};

export default dumpDirContentReducer;
