import path from 'path';
import mkdirp from 'mkdirp';
import PQueue from 'p-queue';
import open from 'open';
import getImageFromLines from '../../tools/decode/getImageFromLines';
import createPng from '../../tools/imageCreation/createPng';
import palettes from '../../../res/palettes';
// import transformImageValues from '../../tools/decode/transformImageValues';

const exportImages = ({ selectedImages, selectedPalettes, imageList }) => {

  const queue = new PQueue({ concurrency: 1 });

  const tmpDir = path.join(process.cwd(), 'out', 'gif');
  mkdirp.sync(path.join(tmpDir));

  const imagesToExport = imageList.filter(({ hash }) => selectedImages.includes(hash));
  const palettesToUse = palettes.filter(({ shortName }) => selectedPalettes.includes(shortName));

  if (!palettesToUse.length) {
    palettesToUse.push(palettes.find(({ shortName }) => shortName === 'bw'));
  }

  const queries = [].concat(...imagesToExport.map(({ hash, binary }) => (
    palettesToUse.map(({ palette, shortName }) => () => (
      new Promise((resolve, reject) => {
        const tmpFile = path.join(tmpDir, `${shortName}-${hash}.png`);

        // const pixelMapBonW = ['░░', '▒▒', '▓▓', '██'];
        // const pixelMapWonB = ['██', '▓▓', '▒▒', '░░'];
        //
        // fs.writeFileSync(`${tmpFile}_wonb.txt`, transformImageValues(getImageFromLines(binary), pixelMapWonB));
        // fs.writeFileSync(`${tmpFile}_bonw.txt`, transformImageValues(getImageFromLines(binary), pixelMapBonW));

        try {
          createPng(tmpFile, getImageFromLines(binary), { scale: 4, palette });
          resolve(tmpFile);
        } catch (error) {
          reject(error);
        }
      })
    ))
  )));

  return queue.addAll(queries)
    .then((files) => {
      open(tmpDir);
      return files;
    });
};

export default exportImages;
