import React from 'react';
import PropTypes from 'prop-types';
import stylesheet from './stylesheet';

const Button = ({ text, index, onPress }) => (
  <button
    top={index * 4}
    mouse
    keys
    class={stylesheet}
    onPress={onPress}
    content={text}
  />
);

Button.propTypes = {
  index: PropTypes.number.isRequired,
  text: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
};

export default Button;
