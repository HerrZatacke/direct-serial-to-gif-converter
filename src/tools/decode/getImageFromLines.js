import decodeGameboyTile from './decodeGameboyTile';
import arrayChunk from './arrayChunk';
import arrayTranspose from './arrayTranspose';

const getImageFromLines = (lines) => {

  const decodedLines = lines
    .map(line => decodeGameboyTile(line))
    .filter(Boolean)
    .map(line => (arrayChunk(line, 8)));

  const chunk = arrayChunk(decodedLines, 20)
    .map(arrayTranspose);

  return [].concat(...chunk)
    .map(line => [].concat(...line));
};

module.exports = getImageFromLines;
