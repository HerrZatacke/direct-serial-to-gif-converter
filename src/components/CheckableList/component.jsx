import React from 'react';
import PropTypes from 'prop-types';
import chalk from 'chalk';
import stylesheet from './stylesheet';

const CheckableList = ({
  height,
  label,
  left,
  onSelect,
  value,
  values,
  width,
}) => {
  const currentItemIndex = values.findIndex(val => val === value.toString(10));
  const items = values.map((itemText, itemIndex) => `[${itemIndex === currentItemIndex ? chalk.white('■') : ' '}] ${itemText}`);

  return (
    <list
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
};

CheckableList.propTypes = {
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  label: PropTypes.string,
  left: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  onSelect: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  values: PropTypes.array.isRequired,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};

CheckableList.defaultProps = {
  label: null,
};

export default CheckableList;