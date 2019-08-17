import React, { Component } from 'react';
import PropTypes from 'prop-types';
import stylesheet from './stylesheet';

class Console extends Component {
  constructor(props) {
    super(props);
    this.node = null;
  }

  render() {
    return (
      <progressbar
        filled={this.props.value}
        ref={(node) => {
          this.node = node;
        }}
        class={stylesheet}
      />
    );
  }
}


Console.propTypes = {
  value: PropTypes.number.isRequired,
};

export default Console;
