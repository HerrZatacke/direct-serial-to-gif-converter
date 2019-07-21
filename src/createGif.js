const { GifWriter } = require('omggif');

const createGif = (rawImage) => {
  const width = rawImage[0].length;
  const height = rawImage.length;
  const palette = [0xffffff, 0xaaaaaa, 0x555555, 0x000000];
  const buf = Buffer.alloc(5000);
  const gifWriter = new GifWriter(buf, width, height);

  gifWriter.addFrame(0, 0, width, height, [].concat(...rawImage), { palette });

  return buf.slice(0, gifWriter.end());
};

module.exports = createGif;
