import React, { Component } from 'react';
import PropTypes from 'prop-types';
import stylesheet from './stylesheet';

class Console extends Component {
  constructor(props) {
    super(props);
    this.node = null;
  }

  componentDidUpdate() {
    this.node.add(this.props.messages[0]);
  }

  render() {
    return (
      <log
        ref={(node) => {
          this.node = node;
        }}
        scrollable
        scrollOnInput
        class={stylesheet}
      />
    );
  }
}


Console.propTypes = {
  messages: PropTypes.array.isRequired,
};

export default Console;
