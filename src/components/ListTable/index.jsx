import React, { Component } from 'react';
import PropTypes from 'prop-types';
import chalk from 'chalk';
import stylesheet from './stylesheet';
import distributeContent from './distributeContent';

class ListTable extends Component {
  constructor(props) {
    super(props);
    this.node = null;

    this.state = {
      width: 100,
    };
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
    return this.props.values.findIndex(({ value }) => value === this.props.value);
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

    const items = values.map(({ data }, itemIndex) => {
      if (checkMark) {
        data.unshift(checkMark ? `[${itemIndex === this.getCurrentItemIndex() ? chalk.white(checkMark) : ' '}] ` : '');
      }
      return data;
    });

    return (
      <list
        ref={(node) => {
          this.node = node || this.node;
          if (this.node.width === this.state.width) {
            return;
          }

          this.setState({
            width: this.node.width,
          });
        }}
        class={stylesheet}
        label={boxLabel}
        items={distributeContent(items, this.state.width)}
        height={height}
        width={width}
        left={left}
        keys
        onSelect={(_, selectedIndex) => {
          onSelect(values[selectedIndex].value);
        }}
        onResize={() => {
          this.setState({
            width: this.node.width,
          });
        }}
      />
    );
  }
}

ListTable.propTypes = {
  boxLabel: PropTypes.string.isRequired,
  checkMark: PropTypes.string,
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  left: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  onSelect: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  values: PropTypes.arrayOf(PropTypes.shape({
    data: PropTypes.array.isRequired,
    value: PropTypes.string.isRequired,
  })).isRequired,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};

ListTable.defaultProps = {
  checkMark: '',
};

export default ListTable;
