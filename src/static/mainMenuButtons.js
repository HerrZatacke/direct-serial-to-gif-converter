const buttons = [
  {
    text: 'Open Port',
    menuAction: 'OPEN_PORT',
    sendKey: 'f1',
  },
  {
    text: 'Configure Port',
    menuAction: 'CONFIG_PORT',
    sendKey: 'f2',
  },
  {
    text: 'Handle Raw Dumps',
    menuAction: 'RAW_DUMPS',
    sendKey: 'f3',
  },
  {
    text: 'Palettes',
    menuAction: 'PALETTES',
    sendKey: 'f4',
    actions: [
      {
        text: 'Export Options',
        menuAction: 'EXPORT_OPTIONS',
        sendKey: 'f6',
      },
    ],
  },
  {
    text: 'Saved Images',
    menuAction: 'IMAGE_LIST',
    sendKey: 'f5',
    actions: [
      {
        text: 'Export Options',
        menuAction: 'EXPORT_OPTIONS',
        sendKey: 'f6',
      },
    ],
  },
];

export default buttons;
