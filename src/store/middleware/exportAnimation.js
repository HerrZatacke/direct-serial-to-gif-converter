import fs from 'fs';
import path from 'path';
import mkdirp from 'mkdirp';
import PQueue from 'p-queue';
import open from 'open';
import getImageFromLines from '../../tools/decode/getImageFromLines';
import GifAnimator from '../../tools/imageCreation/GifAnimator';
import palettes from '../../../res/palettes';

const exportAnimation = ({ selectedImages, imageList, selectedPalettes }) => {

  const queue = new PQueue({ concurrency: 1 });

  const tmpDir = path.join(process.cwd(), 'out', 'gif');
  mkdirp.sync(path.join(tmpDir));

  const framesToExport = imageList.filter(({ hash }) => selectedImages.includes(hash));
  const palettesToUse = palettes.filter(({ shortName }) => selectedPalettes.includes(shortName));

  if (!palettesToUse.length) {
    palettesToUse.push(palettes.find(({ shortName }) => shortName === 'bw'));
  }

  const queries = palettesToUse.map(({ palette, shortName }) => () => (
    new Promise((resolve, reject) => {

      const gifAnimator = new GifAnimator({
        width: 160,
        height: 144,
        scale: 4,
        delay: 15,
        palette,
      });

      framesToExport.forEach(({ binary }) => {
        gifAnimator.addFrame(getImageFromLines(binary));
      });

      const result = gifAnimator.finalize();

      const tmpFile = path.join(tmpDir, `${shortName}-${result.hash}.gif`);
      fs.writeFile(tmpFile, result.buffer, (error) => {
        if (error) {
          reject(error);
          return;
        }
        open(tmpDir);
        resolve(selectedImages.length);
      });
    })
  ));

  return queue.addAll(queries)
    .then((files) => {
      open(tmpDir);
      return files;
    });
};

export default exportAnimation;
