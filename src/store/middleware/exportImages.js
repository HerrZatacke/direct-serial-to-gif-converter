import path from 'path';
import mkdirp from 'mkdirp';
import PQueue from 'p-queue';
import open from 'open';
import getImageFromLines from '../../tools/decode/getImageFromLines';
import createPng from '../../tools/imageCreation/createPng';
// import transformImageValues from '../../tools/decode/transformImageValues';

const exportImages = ({ selectedImages, imageList }) => {

  const queue = new PQueue({ concurrency: 1 });

  const tmpDir = path.join(process.cwd(), 'out', 'gif');
  mkdirp.sync(path.join(tmpDir));

  const imagesToExport = imageList.filter(({ hash }) => selectedImages.includes(hash));

  return queue.addAll(imagesToExport.map(({ hash, binary }) => () => (
    new Promise((resolve, reject) => {
      const tmpFile = path.join(tmpDir, `${hash}.png`);

      // const pixelMapBonW = ['░░', '▒▒', '▓▓', '██'];
      // const pixelMapWonB = ['██', '▓▓', '▒▒', '░░'];
      //
      // fs.writeFileSync(`${tmpFile}_wonb.txt`, transformImageValues(getImageFromLines(binary), pixelMapWonB));
      // fs.writeFileSync(`${tmpFile}_bonw.txt`, transformImageValues(getImageFromLines(binary), pixelMapBonW));

      try {
        createPng(tmpFile, getImageFromLines(binary), { scale: 4 });
        resolve(tmpFile);
      } catch (error) {
        reject(error);
      }
    })
  )))
    .then((files) => {
      open(tmpDir);
      return files;
    });
};

export default exportImages;
