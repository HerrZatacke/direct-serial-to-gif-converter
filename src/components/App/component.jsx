import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import Button from '../Button';
import Console from '../Console';

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
  </Provider>
);

App.propTypes = {
  store: PropTypes.object.isRequired,
  comName: PropTypes.string.isRequired,
};

export default App;
