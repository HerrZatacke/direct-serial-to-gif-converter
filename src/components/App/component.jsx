import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import Console from '../Console';
import ModuleSwitch from '../ModuleSwitch';

const App = ({ store }) => (
  <Provider store={store}>
    <ModuleSwitch />
    <Console />
  </Provider>
);

App.propTypes = {
  store: PropTypes.object.isRequired,
};

export default App;
