const transformImageValues = (image, pixelMap) => (
  image
    .map(line => (
      line.map(code => (
        pixelMap[code]
      )).join('')
    )).join('\n')
);

module.exports = transformImageValues;
