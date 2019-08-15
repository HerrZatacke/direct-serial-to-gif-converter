import React, { Component } from 'react';
import PropTypes from 'prop-types';
import chalk from 'chalk';
import stylesheet from './stylesheet';

class List extends Component {
  constructor(props) {
    super(props);
    this.node = null;
  }

  componentDidMount() {
    this.node.select(this.getCurrentItemIndex());
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
    return this.props.values.findIndex(({ label }) => label === this.props.value);
  }

  render() {
    const {
      checkMark,
      height,
      boxLabel,
      left,
      onSelect,
      values,
      width,
    } = this.props;

    const items = values.map(({ label }, itemIndex) => {
      const visualCheckMark = checkMark ? `[${itemIndex === this.getCurrentItemIndex() ? chalk.white(checkMark) : ' '}] ` : '';
      return `${visualCheckMark}${label}`;
    });

    return (
      <list
        ref={(node) => {
          this.node = node || this.node;
        }}
        class={stylesheet}
        label={boxLabel}
        items={items}
        height={height}
        width={width}
        left={left}
        keys
        onSelect={(_, selectedIndex) => {
          onSelect(values[selectedIndex].value);
        }}
      />
    );
  }
}

List.propTypes = {
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  boxLabel: PropTypes.string.isRequired,
  left: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  onSelect: PropTypes.func.isRequired,
  checkMark: PropTypes.string,
  value: PropTypes.string.isRequired,
  values: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
  })).isRequired,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};

List.defaultProps = {
  checkMark: '',
};

export default List;
