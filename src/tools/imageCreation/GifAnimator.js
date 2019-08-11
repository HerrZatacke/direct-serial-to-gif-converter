import crypto from 'crypto';
import { GifWriter } from 'omggif';
import scaleRawImage from './scaleRawImage';

class GifAnimator {
  constructor({
    width,
    height,
    scale,
    palette,
    delay,
  }) {
    this.options = {
      scale: Math.min(16, Math.max(1, scale ? Math.ceil(scale) : 1)),
      palette: palette || [0xffffff, 0xaaaaaa, 0x555555, 0x000000],
      width: width * scale,
      height: height * scale,
      delay,
    };

    this.reset();

    this.gifWriter = new GifWriter(this.buf, this.options.width, this.options.height, {
      palette: this.options.palette,
      loop: true,
    });
  }

  reset() {
    this.buf = Buffer.alloc(1024 * 1024 * 16); // ~ 16MB
    this.hash = crypto.createHash('sha1');
  }

  addFrame(rawImage) {
    const {
      width,
      height,
      scale,
      delay,
    } = this.options;

    try {
      this.gifWriter.addFrame(0, 0, width, height, [].concat(...scaleRawImage(rawImage, scale)), { delay });
      this.hash.update(rawImage.join(''));
    } catch (error) {
      console.error(error.message);
      console.error('Maybe received only a partial frame?');
    }
  }

  finalize() {
    const buffer = this.buf.slice(0, this.gifWriter.end());
    const hash = this.hash.digest('hex');
    this.reset();

    return {
      buffer,
      hash,
    };
  }

}

export default GifAnimator;
