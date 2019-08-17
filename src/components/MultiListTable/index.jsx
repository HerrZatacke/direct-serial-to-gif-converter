import React, { Component } from 'react';
import PropTypes from 'prop-types';
import chalk from 'chalk';
import stylesheet from './stylesheet';
import distributeContent from './distributeContent';

class MultiListTable extends Component {
  constructor(props) {
    super(props);
    this.node = null;

    this.state = {
      width: 100,
    };

    this.handleSelect = this.handleSelect.bind(this);
  }

  componentDidMount() {
    this.node.select(0);
    this.node.focus();
  }

  componentDidUpdate(prevProps) {
    if (JSON.stringify(prevProps.values) !== JSON.stringify(this.props.values)) {
      this.node.select(0);
    }
  }

  isSelected(value) {
    return this.props.selectedValues.includes(value);
  }

  handleSelect(_, selectedIndex) {
    const selectedValue = this.props.values[selectedIndex].value;
    let nextSelect;

    if (this.props.selectedValues.includes(selectedValue)) {
      nextSelect = this.props.selectedValues.filter(v => v !== selectedValue);
    } else {
      nextSelect = [...this.props.selectedValues, selectedValue];
    }

    this.props.onSelect(nextSelect);
  }

  render() {
    const {
      boxLabel,
      columnStyles,
      height,
      left,
      values,
      width,
    } = this.props;

    const items = values.map(({ data, value }) => (
      [`[${chalk.white(this.isSelected(value) ? '■' : ' ')}]`, ...data]
    ));

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
        items={distributeContent(items, this.state.width, columnStyles)}
        height={height}
        width={width}
        left={left}
        keys
        onSelect={this.handleSelect}
        onResize={() => {
          this.setState({
            width: this.node.width,
          });
        }}
      />
    );
  }
}

MultiListTable.propTypes = {
  boxLabel: PropTypes.string.isRequired,
  columnStyles: PropTypes.array,
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  left: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  onSelect: PropTypes.func.isRequired,
  selectedValues: PropTypes.array.isRequired,
  values: PropTypes.arrayOf(PropTypes.shape({
    data: PropTypes.array.isRequired,
    value: PropTypes.string.isRequired,
  })).isRequired,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};

MultiListTable.defaultProps = {
  columnStyles: [],
};

export default MultiListTable;
