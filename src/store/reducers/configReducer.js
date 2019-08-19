import deepmerge from 'deepmerge';

const defaultPortConfig = {
  comName: '',
  baudRate: '',
  dataBits: '',
  stopBits: '',
  parity: '',
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
