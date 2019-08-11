import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import Button from '../Button';
import Console from '../Console';

const App = ({ store }) => (
  <Provider store={store}>
    <Button
      text="el boton"
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
};

export default App;
