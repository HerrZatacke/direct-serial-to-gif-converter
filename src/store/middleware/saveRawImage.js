import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import mkdirp from 'mkdirp';

const rawDir = path.join(process.cwd(), 'out', 'raw', 'images');

const saveRawImage = imageData => (
  new Promise((resolve, reject) => {
    const image = imageData.join('\n');
    const hasher = crypto.createHash('sha1');
    hasher.update(image);
    const hash = hasher.digest('hex');

    try {
      mkdirp.sync(path.join(rawDir));
      const filename = path.join(rawDir, `${hash}.txt`);
      fs.writeFileSync(filename, image);
      resolve({
        filename,
        hash,
      });
    } catch (error) {
      reject(error);
    }
  })
);

export default saveRawImage;
