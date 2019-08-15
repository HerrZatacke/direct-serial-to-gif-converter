const stylesheet = {
  box: {
    top: 0,
    width: '60%',
  },
  infobox: {
    top: 0,
    width: '60%',
    height: 1,
    style: {
      bg: '#00ffff',
      fg: '#ffffff',
    },
  },
  list: {
    border: {
      type: 'line',
    },
    style: {
      bg: '#0000ff',
      fg: '#00ffff',
      border: {
        bg: '#0000ff',
        fg: '#00ffff',
      },
      label: {
        bg: '#0000ff',
        fg: '#ffffff',
      },
      focus: {
        border: {
          fg: '#ffffff',
          bg: '#0000ff',
        },
      },
      selected: {
        // fg: '#0000ff',
        bg: '#00ffff',
      },
      item: {
        fg: '#00ffff',
        bg: '#0000ff',
      },
    },
  },
};

export default stylesheet;
