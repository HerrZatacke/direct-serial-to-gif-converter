/*
 * Takes a 160x8 2d array with values between 0-3 which represent a row of 20 gemebox tiles (8x8)
 * Each value will be converted to a string given in the pixelMap
 *
 * returns a string
 */

const transformImageValues = (image, pixelMap) => (
  image
    .map(line => (
      line.map(code => (
        pixelMap[code]
      )).join('')
    )).join('\n')
);

module.exports = transformImageValues;
