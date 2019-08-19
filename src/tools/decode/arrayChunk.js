/*
 * Splits a 1d array into a 2d array every nth item defined by chunkSize
 */
const arrayChunk = (array, chunkSize) => (
  [].concat(...array.map((elem, i) => (
    i % chunkSize ? [] : [array.slice(i, i + chunkSize)]
  )))
);

export default arrayChunk;
