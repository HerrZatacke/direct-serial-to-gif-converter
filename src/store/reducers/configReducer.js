import deepmerge from 'deepmerge';

const defaultPortConfig = {
  comName: '',
  baudRate: 115200,
  dataBits: 7,
  stopBits: 1,
  parity: 'even',
};

const configReducer = (config = { portConfig: defaultPortConfig }, action) => {
  switch (action.type) {
    case 'SET_CONFIG':
      return { ...deepmerge(config, action.payload) };
    default:
      return config;
  }
};

export default configReducer;
