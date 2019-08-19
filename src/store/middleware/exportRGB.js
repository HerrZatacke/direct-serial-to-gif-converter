import fs from 'fs';
import path from 'path';
import mkdirp from 'mkdirp';
import open from 'open';
import getImageFromLines from '../../tools/decode/getImageFromLines';
import createGif from '../../tools/imageCreation/createGif';
import createRGBPalette from '../../tools/imageCreation/createRGBPalette';

const exportAnimation = ({ selectedImages, imageList }) => {
  const tmpDir = path.join(process.cwd(), 'out', 'gif');
  mkdirp.sync(path.join(tmpDir));

  const channels = imageList.filter(({ hash }) => selectedImages.includes(hash));

  const raw = {
    r: getImageFromLines(channels[2].binary),
    g: getImageFromLines(channels[1].binary),
    b: getImageFromLines(channels[0].binary),
  };

  const mergedRGB = raw.r.map((row, y) => (
    row.map((col, x) => (
      // eslint-disable-next-line no-bitwise
      (col << 4) + (raw.g[y][x] << 2) + raw.b[y][x]
    ))
  ));

  return new Promise((resolve, reject) => {
    // const framesToExport = imageList.filter(({ hash }) => selectedImages.includes(hash));

    const rawGif = createGif(mergedRGB, { scale: 4, palette: createRGBPalette() });
    const tmpFile = path.join(tmpDir, 'rgb.gif');

    fs.writeFile(tmpFile, rawGif, (error) => {
      if (error) {
        reject(error);
        return;
      }
      open(tmpDir);
      resolve(tmpFile);
    });

  });
};

export default exportAnimation;
