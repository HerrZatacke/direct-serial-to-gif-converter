import React from 'react';
import PropTypes from 'prop-types';
import MultiListTable from '../MultiListTable';

const PalettesSelector = ({
  palettes,
  selectedPalettes,
  setSelectedPalettes,
  subModuleOpened,
  width,
}) => (
  <MultiListTable
    height="100%-1"
    boxLabel={`Palettes (${palettes.length})`}
    left={0}
    values={palettes.map(({ name, shortName }) => ({
      value: shortName,
      data: [shortName, name],
    }))}
    value=".."
    width={width}
    inactive={subModuleOpened}
    selectedValues={selectedPalettes}
    onSelect={(values) => {
      setSelectedPalettes(values);
    }}
  />
);

PalettesSelector.propTypes = {
  width: PropTypes.number.isRequired,
  palettes: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    shortName: PropTypes.string.isRequired,
  })).isRequired,
  selectedPalettes: PropTypes.arrayOf(PropTypes.string).isRequired,
  setSelectedPalettes: PropTypes.func.isRequired,
  subModuleOpened: PropTypes.bool.isRequired,
};

export default PalettesSelector;
