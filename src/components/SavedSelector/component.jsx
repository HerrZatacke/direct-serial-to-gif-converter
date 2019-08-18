import React from 'react';
import PropTypes from 'prop-types';
import MultiListTable from '../MultiListTable';

const SavedSelector = ({
  imageList,
  selectedImages,
  setSelectedImages,
  subModuleOpened,
  width,
}) => (
  <MultiListTable
    height="100%-1"
    boxLabel={`Saved Images (${imageList.length})`}
    left={0}
    values={imageList.map(({ created, hash }) => ({
      value: hash,
      data: [hash, created],
    }))}
    value=".."
    width={width}
    inactive={subModuleOpened}
    selectedValues={selectedImages}
    onSelect={(values) => {
      setSelectedImages(values);
    }}
  />
);

SavedSelector.propTypes = {
  imageList: PropTypes.arrayOf(PropTypes.shape({
    binary: PropTypes.array.isRequired,
    hash: PropTypes.string.isRequired,
    created: PropTypes.string.isRequired,
  })).isRequired,
  selectedImages: PropTypes.arrayOf(PropTypes.string).isRequired,
  setSelectedImages: PropTypes.func.isRequired,
  subModuleOpened: PropTypes.bool.isRequired,
  width: PropTypes.number.isRequired,
};

export default SavedSelector;
