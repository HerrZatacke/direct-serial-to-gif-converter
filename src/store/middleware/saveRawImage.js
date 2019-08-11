import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import mkdirp from 'mkdirp';

const rawDir = path.join(process.cwd(), 'out', 'raw');

const saveRawImage = imageData => (
  new Promise((resolve, reject) => {
    const image = imageData.join('\n');
    const hash = crypto.createHash('sha1');
    hash.update(image);

    try {
      mkdirp.sync(path.join(rawDir));
      const filename = path.join(rawDir, `${hash.digest('hex')}.txt`);
      fs.writeFileSync(filename, image);
      resolve(filename);
    } catch (error) {
      reject(error);
    }
  })
);

export default saveRawImage;
