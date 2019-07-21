const transformImageValues = (image, colorMap) => {
  return image
    .map(line => (
      line.map(code => (
        colorMap[code]
      )).join('')
    )).join('\n');
};

module.exports = transformImageValues;
