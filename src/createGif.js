const { GifWriter } = require('omggif');

const scaleRawImage = (rawImage, factor) => {
  const rows = [];

  rawImage.forEach((row) => {
    const pixels = [];
    row.forEach((pixel) => {
      pixels.push(...[...new Array(factor)].map(() => pixel));
    });
    rows.push(...[...new Array(factor)].map(() => [...pixels]));
  });

  return rows;
};

const createGif = (rawImage, { scale }) => {

  const options = {
    scale: Math.min(16, Math.max(1, scale ? Math.ceil(scale) : 1)),
  };

  const width = rawImage[0].length;
  const height = rawImage.length;
  const palette = [0xffffff, 0xaaaaaa, 0x555555, 0x000000];
  const buf = Buffer.alloc(1024 * 1024);
  const gifWriter = new GifWriter(buf, width, height);

  gifWriter.addFrame(0, 0, width * options.scale, height * options.scale, [].concat(...scaleRawImage(rawImage, options.scale)), { palette });

  return buf.slice(0, gifWriter.end());
};

module.exports = createGif;
