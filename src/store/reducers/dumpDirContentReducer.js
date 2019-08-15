import fs from 'fs';

const dumpDirContentReducer = (dumpDirContent = [], action) => {
  switch (action.type) {
    case 'CHANGE_DUMPDIR':
      try {
        return [
          '..',
          ...fs.readdirSync(action.payload, { encoding: 'utf8' })
            .filter(filename => filename[0] !== '.'),
        ];
      } catch (error) {
        return [];
      }
    default:
      return dumpDirContent;
  }
};

export default dumpDirContentReducer;
