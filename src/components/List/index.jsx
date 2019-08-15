import React, { Component } from 'react';
import PropTypes from 'prop-types';
import chalk from 'chalk';
import stylesheet from './stylesheet';

class List extends Component {
  constructor(props) {
    super(props);
    this.node = null;
  }

  componentDidUpdate(prevProps) {
    const { value, values } = this.props;
    if (JSON.stringify(prevProps.values) !== JSON.stringify(values)) {
      this.node.select(this.getCurrentItemIndex());
    }

    if (prevProps.value !== value) {
      this.node.enterSelected(this.getCurrentItemIndex());
    }
  }

  getCurrentItemIndex() {
    return this.props.values.findIndex(val => val === this.props.value);
  }

  render() {
    const {
      checkMark,
      height,
      label,
      left,
      onSelect,
      values,
      width,
    } = this.props;

    const items = values.map((itemText, itemIndex) => {
      const visualCheckMark = checkMark ? `[${itemIndex === this.getCurrentItemIndex() ? chalk.white(checkMark) : ' '}] ` : '';
      return `${visualCheckMark}${itemText}`;
    });

    return (
      <list
        ref={(node) => {
          this.node = node || this.node;
        }}
        class={stylesheet}
        label={label}
        items={items}
        height={height}
        width={width}
        left={left}
        keys
        onSelect={(_, selectedIndex) => {
          onSelect(values[selectedIndex]);
        }}
      />
    );
  }
}

List.propTypes = {
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  label: PropTypes.string,
  left: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  onSelect: PropTypes.func.isRequired,
  checkMark: PropTypes.string,
  value: PropTypes.string.isRequired,
  values: PropTypes.array.isRequired,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};

List.defaultProps = {
  checkMark: '',
  label: null,
};

export default List;
