import React, { Component } from 'react';
import PropTypes from 'prop-types';
import stylesheet from './stylesheet';

class Progress extends Component {
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
        width={this.props.width}
        class={stylesheet}
      />
    );
  }
}


Progress.propTypes = {
  value: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
};

export default Progress;
