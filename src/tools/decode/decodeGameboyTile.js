/* eslint-disable no-bitwise */
const TILE_WIDTH = 8;
const TILE_HEIGHT = 8;

const decodeGameboyTile = (rawBytes) => {
  const bytes = rawBytes.replace(/[^0-9A-F]/ig, '');

  if (bytes.length !== 32) {
    return false;
  }

  const byteArray = bytes
    .match(/[0-9A-F]{1,2}/gi)
    .map(byte => parseInt(byte, 16));

  return [...new Array(TILE_WIDTH * TILE_HEIGHT)]
    .map((_, index) => {
      const x = index % TILE_WIDTH;
      const y = Math.floor(index / TILE_HEIGHT);
      const hiBit = (byteArray[(y * 2) + 1] >> (7 - x)) & 1;
      const loBit = (byteArray[y * 2] >> (7 - x)) & 1;
      return (hiBit << 1) | loBit;
    });
};

export default decodeGameboyTile;
