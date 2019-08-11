import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import mkdirp from 'mkdirp';

const rawDir = path.join(process.cwd(), 'out', 'raw');

const saveRawImage = (imageData) => {

  const image = imageData.join('\n');
  const hash = crypto.createHash('sha1');
  hash.update(image);

  mkdirp.sync(path.join(rawDir));
  fs.writeFileSync(path.join(rawDir, `${hash.digest('hex')}.txt`), image);
};

export default saveRawImage;
