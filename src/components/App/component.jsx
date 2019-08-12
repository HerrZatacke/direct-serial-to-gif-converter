import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import Button from '../Button';
import ComSettings from '../ComSettings';
import Console from '../Console';
import Progress from '../Progress';

const App = ({ store, comName }) => (
  <Provider store={store}>
    <Button
      text={`Open Port (${comName})`}
      index={0}
      onPress={() => {
        store.dispatch({
          type: 'OPEN_PORT',
        });
      }}
    />
    <Console />
    <Button
      text="Probe Ports"
      index={1}
      onPress={() => {
        store.dispatch({
          type: 'PROBE_PORTS',
        });
      }}
    />
    <ComSettings />
    <Progress />
    <Console />
  </Provider>
);

App.propTypes = {
  store: PropTypes.object.isRequired,
  comName: PropTypes.string.isRequired,
};

export default App;
