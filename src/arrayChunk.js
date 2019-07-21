const arrayChunk = (array, chunkSize) => (
  [].concat(...array.map((elem, i) => (
    i % chunkSize ? [] : [array.slice(i, i + chunkSize)]
  )))
);

module.exports = arrayChunk;
