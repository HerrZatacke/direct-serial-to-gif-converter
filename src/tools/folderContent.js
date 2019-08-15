import fs from 'fs';
import path from 'path';
import filesize from 'filesize';

const folderContent = (folderPath) => {
  const contents = fs.readdirSync(folderPath, { encoding: 'utf8' })
    .filter(filename => filename[0] !== '.')
    .map((filename) => {

      const stats = fs.lstatSync(path.join(folderPath, filename));
      const typeMark = stats.isDirectory() ? 'dir' : 'file';

      return {
        value: filename,
        data: [typeMark, filename, stats.isDirectory() ? '' : filesize(stats.size)],
      };
    });

  contents.sort(({ data: a }, { data: b }) => {

    if (a[0] > b[0]) {
      return 1;
    }

    if (a[0] < b[0]) {
      return -1;
    }

    if (a[1] > b[1]) {
      return 1;
    }

    if (a[1] < b[1]) {
      return -1;
    }

    return 0;
  });

  return [{ value: '..', data: ['dir', '..', ''] }, ...contents];
};

export default folderContent;
