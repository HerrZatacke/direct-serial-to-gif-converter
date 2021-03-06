const palettes = [
  {
    name: 'Black & White',
    shortName: 'bw',
    palette: ['#ffffff', '#aaaaaa', '#555555', '#000000'],
  },
  {
    name: 'Cyanide Blues',
    shortName: 'cybl',
    palette: ['#9efbe3', '#21aff5', '#1e4793', '#0e1e3d'],
  },
  {
    name: 'Audi Quattro Pikes Peak',
    shortName: 'aqpp',
    palette: ['#ebeee7', '#868779', '#fa2b25', '#2a201e'],
  },
  {
    name: 'Waterfront Plaza',
    shortName: 'wtfp',
    palette: ['#cecece', '#6f9edf', '#42678e', '#102533'],
  },
  {
    name: 'Childhood in Greenland',
    shortName: 'chig',
    palette: ['#d0d058', '#a0a840', '#708028', '#405010'],
  },
  {
    name: 'Rusted City Sign',
    shortName: 'rcs',
    palette: ['#edb4a1', '#a96868', '#764462', '#2c2137'],
  },
  {
    name: 'Floyd Steinberg in Love',
    shortName: 'fsil',
    palette: ['#eaf5fa', '#5fb1f5', '#d23c4e', '#4c1c2d'],
  },
  {
    name: 'Space Haze Overload',
    shortName: 'shzol',
    palette: ['#f8e3c4', '#cc3495', '#6b1fb1', '#0b0630'],
  },
  {
    name: 'The death of Yung Columbus',
    shortName: 'tdocy',
    palette: ['#b5ff32', '#ff2261', '#462917', '#1d1414'],
  },
  {
    name: 'Caramel Fudge Paranoia',
    shortName: 'cfp',
    palette: ['#CF9255', '#CF7163', '#B01553', '#3f1711'],
  },
  {
    name: 'Sunflower Holidays',
    shortName: 'sfh',
    palette: ['#ffff55', '#ff5555', '#881400', '#000000'],
  },
  {
    name: 'Deep Haze Green',
    shortName: 'dhg',
    palette: ['#A1D909', '#467818', '#27421F', '#000000'],
  },
  {
    name: 'Youth Ikarus reloaded',
    shortName: 'yirl',
    palette: ['#cef7f7', '#f78e50', '#9e0000', '#1e0000'],
  },
  {
    name: 'Candy Cotton Tower Raid',
    shortName: 'cctr',
    palette: ['#E6AEC4', '#E65790', '#8F0039', '#380016'],
  },
  {
    name: 'Dune 2000 remastered',
    shortName: 'd2kr',
    palette: ['#FBF1CD', '#c09e7d', '#725441', '#000000'],
  },
  {
    name: 'Super Hyper Mega Gameboy',
    shortName: 'shmgy',
    palette: ['#f7e7c6', '#d68e49', '#a63725', '#331e50'],
  },
  {
    name: 'Links late Awakening',
    shortName: 'llawk',
    palette: ['#ffffb5', '#7bc67b', '#6b8c42', '#5a3921'],
  },
  {
    name: 'CGA Palette Crush 1',
    shortName: 'cga1',
    palette: ['#ffffff', '#55ffff', '#ff55ff', '#000000'],
  },
  {
    name: 'CGA Palette Crush 2',
    shortName: 'cga2',
    palette: ['#ffffff', '#55FFFF', '#FF5555', '#000000'],
  },
  {
    name: 'Metroid Aran remixed',
    shortName: 'marmx',
    palette: ['#aedf1e', '#047e60', '#b62558', '#2c1700'],
  },
  {
    name: 'Starlit Memories',
    shortName: 'slmem',
    palette: ['#869AD9', '#6D53BD', '#6F2096', '#4F133F'],
  },
  {
    name: 'Drowning at night',
    shortName: 'datn',
    palette: ['#A9B0B3', '#586164', '#20293F', '#030C22'],
  },
  {
    name: 'The starry knight',
    shortName: 'tsk',
    palette: ['#f5db37', '#37cae5', '#0f86b6', '#123f77'],
  },
  {
    name: 'Purple Rain',
    shortName: 'ppr',
    palette: ['#adfffc', '#8570b2', '#ff0084', '#68006a'],
  },
  {
    name: 'CMYKeystone',
    shortName: 'cmyk',
    palette: ['#ffff00', '#0be8fd', '#fb00fa', '#373737'],
  },
  {
    name: 'Virtual Boy 1985',
    shortName: 'vb85',
    palette: ['#ff0000', '#db0000', '#520000', '#000000'],
  },
  {
    name: 'Azure Clouds',
    shortName: 'azc',
    palette: ['#47ff99', '#32b66d', '#124127', '#000000'],
  },
  {
    name: 'Golden Elephant Curry',
    shortName: 'gelc',
    palette: ['#ff9c00', '#c27600', '#4f3000', '#000000'],
  },
  {
    name: 'Romero`s Garden',
    shortName: 'roga',
    palette: ['#EBC4AB', '#649a57', '#574431', '#323727'],
  },
  {
    name: 'Knee-Deep in the Wood',
    shortName: 'kditw',
    palette: ['#fffe6e', '#d5690f', '#3c3ca9', '#2C2410'],
  },
  {
    name: 'Dies ist meine Wassermelone',
    shortName: 'dimwm',
    palette: ['#ffdbcb', '#f27d7a', '#558429', '#222903'],
  },
  {
    name: 'My Friend from Bavaria',
    shortName: 'spezi',
    palette: ['#FEDA1B', '#DF7925', '#B60077', '#382977'],
  },
  {
    name: 'Flowerfeldstraße',
    shortName: 'ffs',
    palette: ['#e9d9cc', '#c5c5ce', '#75868f', '#171f62'],
  },
  {
    name: 'There\'s always money',
    shortName: 'banana',
    palette: ['#fdfe0a', '#fed638', '#977b25', '#221a09'],
  },
  {
    name: 'Artistic Caffeinated Lactose',
    shortName: 'hipster',
    palette: ['#fdfef5', '#dea963', '#9e754f', '#241606'],
  },
  {
    name: 'Nortorious Comandante',
    shortName: 'nc',
    palette: ['#FCFE54', '#54FEFC', '#04AAAC', '#0402AC'],
  },
].map(({ name, palette, shortName }) => {
  const convertedColors = palette.map(color => (
    // ensure correct hex string length
    color.length !== 7 ? null : parseInt(color.substring(1), 16)
  ))
    .filter(color => color !== null);

  // ensure 4 colors
  return (convertedColors.length !== 4) ? null : {
    name,
    shortName,
    palette: convertedColors,
  };
})
  .filter(Boolean);

module.exports = palettes;
