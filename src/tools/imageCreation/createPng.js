/* eslint-disable no-bitwise */
import fs from 'fs';
import { PNG } from 'pngjs';
import scaleRawImage from './scaleRawImage';

const createGif = (filename, rawImage, { scale = 1, palette } = {}) => {

  const options = {
    scale: Math.min(16, Math.max(1, scale ? Math.ceil(scale) : 1)),
    palette: palette || [0xffffff, 0xaaaaaa, 0x555555, 0x000000],
    // palette: palette || [0xd0d058, 0xa0a840, 0x708028, 0x405010],
  };

  const width = rawImage[0].length * options.scale;
  const height = rawImage.length * options.scale;

  try {
    const png = new PNG({
      width,
      height,
      filterType: -1,
    });

    const scaled = [].concat(...scaleRawImage(rawImage, options.scale));

    scaled.forEach((value, index) => {
      const color = options.palette[value];
      png.data[index * 4] = (color & 0xff0000) >> 16;
      png.data[(index * 4) + 1] = (color & 0x00ff00) >> 8;
      png.data[(index * 4) + 2] = (color & 0x0000ff);
      png.data[(index * 4) + 3] = 255;
    });

    png.pack().pipe(fs.createWriteStream(filename));

  } catch (error) {
    console.error(error.message);
    console.error('Maybe received only a partial image?');
  }
};

export default createGif;
