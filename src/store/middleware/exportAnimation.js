import fs from 'fs';
import path from 'path';
import mkdirp from 'mkdirp';
import open from 'open';
import getImageFromLines from '../../tools/decode/getImageFromLines';
import GifAnimator from '../../tools/imageCreation/GifAnimator';

const exportAnimation = ({ selectedImages, imageList }) => {
  const tmpDir = path.join(process.cwd(), 'out', 'gif');
  mkdirp.sync(path.join(tmpDir));

  return new Promise((resolve, reject) => {
    const framesToExport = imageList.filter(({ hash }) => selectedImages.includes(hash));

    const gifAnimator = new GifAnimator({
      width: 160,
      height: 144,
      scale: 4,
      delay: 15,
    });

    framesToExport.forEach(({ binary }) => {
      gifAnimator.addFrame(getImageFromLines(binary));
    });

    const result = gifAnimator.finalize();

    const tmpFile = path.join(tmpDir, `${result.hash}.gif`);
    fs.writeFile(tmpFile, result.buffer, (error) => {
      if (error) {
        reject(error);
        return;
      }
      open(tmpDir);
      resolve(selectedImages.length);
    });
  });
};

export default exportAnimation;
