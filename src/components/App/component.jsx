import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import ComSettings from '../ComSettings';
import Console from '../Console';
import MainMenu from '../MainMenu';
import Progress from '../Progress';

const App = ({ store }) => (
  <Provider store={store}>
    <ComSettings />
    <Progress />
    <Console />
    <MainMenu />
  </Provider>
);

App.propTypes = {
  store: PropTypes.object.isRequired,
};

export default App;
