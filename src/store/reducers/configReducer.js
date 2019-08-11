import deepmerge from 'deepmerge';

const configReducer = (config = {}, action) => {
  switch (action.type) {
    case 'SET_CONFIG':
      return { ...deepmerge(config, action.payload) };
    default:
      return config;
  }
};

export default configReducer;
