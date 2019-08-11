import { GifWriter } from 'omggif';
import scaleRawImage from './scaleRawImage';

const createGif = (rawImage, { scale, palette }) => {

  const options = {
    scale: Math.min(16, Math.max(1, scale ? Math.ceil(scale) : 1)),
    palette: palette || [0xffffff, 0xaaaaaa, 0x555555, 0x000000],
  };

  const width = rawImage[0].length * options.scale;
  const height = rawImage.length * options.scale;

  const buf = Buffer.alloc(1024 * 1024 * 16);

  try {
    const gifWriter = new GifWriter(buf, width, height);
    gifWriter.addFrame(0, 0, width, height, [].concat(...scaleRawImage(rawImage, options.scale)), { palette: options.palette });
    return buf.slice(0, gifWriter.end());
  } catch (error) {
    console.error(error.message);
    console.error('Maybe received only a partial image?');
    return null;
  }
};

export default createGif;
