const createRGBPalette = () => {
  const palette = [];

  const rshades = [0xff, 0xaa, 0x55, 0x00];
  const gshades = [0xff, 0xaa, 0x55, 0x00];
  const bshades = [0xff, 0xaa, 0x55, 0x00];

  for (let r = 0; r < 4; r += 1) {
    for (let g = 0; g < 4; g += 1) {
      for (let b = 0; b < 4; b += 1) {
        palette.push((0x10000 * rshades[r]) + (0x100 * gshades[g]) + bshades[b]);
      }
    }
  }

  return palette;
};

export default createRGBPalette;
