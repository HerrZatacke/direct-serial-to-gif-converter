import React from 'react';
import PropTypes from 'prop-types';
import stylesheet from './stylesheet';
import List from '../List';

const ExportOptions = ({
  imageCount,
  menuOptions,
  paletteCount,
  selectMenuOption,
}) => (
  <box
    label="Export Options"
    class={stylesheet}
  >
    <List
      boxLabel={`Export Options (${imageCount} Images / ${paletteCount} Palettes)`}
      value="SINGLE_FILES"
      values={menuOptions}
      height="100%"
      width="100%"
      left={0}
      focus
      onSelect={(value) => {
        selectMenuOption(value);
      }}
    />
  </box>
);

ExportOptions.propTypes = {
  imageCount: PropTypes.number.isRequired,
  menuOptions: PropTypes.array.isRequired,
  paletteCount: PropTypes.number.isRequired,
  selectMenuOption: PropTypes.func.isRequired,
};

export default ExportOptions;
