import React, { Component } from 'react';
import PropTypes from 'prop-types';
import stylesheet from './stylesheet';

class Console extends Component {
  constructor(props) {
    super(props);
    this.node = null;
  }

  componentDidUpdate(prevProps) {
    if (prevProps.messages.length !== this.props.messages.length) {
      this.node.add(this.props.messages[0]);
    }
  }

  render() {
    return (
      <log
        ref={(node) => {
          this.node = node;
        }}
        width={this.props.width}
        tags
        scrollable
        scrollOnInput
        class={stylesheet}
      />
    );
  }
}


Console.propTypes = {
  messages: PropTypes.array.isRequired,
  width: PropTypes.number.isRequired,
};

export default Console;
