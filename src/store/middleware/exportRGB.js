import path from 'path';
import mkdirp from 'mkdirp';
import crypto from 'crypto';
import PQueue from 'p-queue';
import open from 'open';
import getImageFromLines from '../../tools/decode/getImageFromLines';
import createPng from '../../tools/imageCreation/createPng';
import createRGBPalette from '../../tools/imageCreation/createRGBPalette';

const exportRGB = ({ selectedImages, imageList }) => {

  const queue = new PQueue({ concurrency: 1 });

  const tmpDir = path.join(process.cwd(), 'out', 'gif');
  mkdirp.sync(path.join(tmpDir));

  const channels = imageList.filter(({ hash }) => selectedImages.includes(hash));

  const modes = [
    [0, 1, 2],
    [0, 2, 1],
    [1, 0, 2],
    [1, 2, 0],
    [2, 0, 1],
    [2, 1, 0],
  ];

  const queries = modes.map(mode => () => (
    new Promise((resolve, reject) => {
      const raw = {
        r: getImageFromLines(channels[mode[0]].binary),
        g: getImageFromLines(channels[mode[1]].binary),
        b: getImageFromLines(channels[mode[2]].binary),
      };

      const hasher = crypto.createHash('sha1');

      hasher.update(raw.b.join(''));
      hasher.update(raw.g.join(''));
      hasher.update(raw.r.join(''));

      const hash = hasher.digest('hex');
      const tmpFile = path.join(tmpDir, `${hash}.png`);

      const mergedRGB = raw.r.map((row, y) => (
        row.map((col, x) => (
          // eslint-disable-next-line no-bitwise
          (col << 4) + (raw.g[y][x] << 2) + raw.b[y][x]
        ))
      ));

      try {
        createPng(tmpFile, mergedRGB, { scale: 4, palette: createRGBPalette() });
        open(tmpDir);
        resolve(tmpFile);
      } catch (error) {
        reject(error);
      }
    })
  ));


  return queue.addAll(queries)
    .then((files) => {
      open(tmpDir);
      return files;
    });
};

export default exportRGB;
