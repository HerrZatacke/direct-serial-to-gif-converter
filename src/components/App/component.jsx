import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import Button from '../Button';
import ComSettings from '../ComSettings';
import Console from '../Console';
import Progress from '../Progress';

const App = ({ store, portConfig }) => (
  <Provider store={store}>
    { portConfig.comName ? (
      <Button
        text={`Open Port (${portConfig.comName}, ${portConfig.baudRate}, ${portConfig.dataBits}, ${portConfig.stopBits}, ${portConfig.parity})`}
        index={0}
        onPress={() => {
          store.dispatch({
            type: 'OPEN_PORT',
          });
        }}
      />
    ) : null}
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
  portConfig: PropTypes.object.isRequired,
};

export default App;
