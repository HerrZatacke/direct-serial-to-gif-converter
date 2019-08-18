import fs from 'fs';
import path from 'path';
import mkdirp from 'mkdirp';
import PQueue from 'p-queue';
import open from 'open';
import getImageFromLines from '../../tools/decode/getImageFromLines';
import createGif from '../../tools/imageCreation/createGif';

const exportImages = ({ selectedImages, imageList }) => {

  const queue = new PQueue({ concurrency: 1 });

  const tmpDir = path.join(process.cwd(), 'out', 'gif');
  mkdirp.sync(path.join(tmpDir));

  const imagesToExport = imageList.filter(({ hash }) => selectedImages.includes(hash));

  return queue.addAll(imagesToExport.map(({ hash, binary }) => () => (
    new Promise((resolve, reject) => {
      const tmpFile = path.join(tmpDir, `${hash}.gif`);
      fs.writeFile(tmpFile, createGif(getImageFromLines(binary), { scale: 4 }), (error) => {
        if (error) {
          reject(error);
          return;
        }
        resolve(tmpFile);
      });
    })
  )))
    .then((files) => {
      open(tmpDir);
      return files;
    });
};

export default exportImages;