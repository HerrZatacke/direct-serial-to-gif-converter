import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import ModuleSwitch from '../ModuleSwitch';
import Console from '../Console';
import MainMenu from '../MainMenu';
import SubModuleSwitch from '../SubModuleSwitch';

const App = ({ store }) => (
  <Provider store={store}>
    <ModuleSwitch />
    <Console />
    <MainMenu />
    <SubModuleSwitch />
  </Provider>
);

App.propTypes = {
  store: PropTypes.object.isRequired,
};

export default App;
