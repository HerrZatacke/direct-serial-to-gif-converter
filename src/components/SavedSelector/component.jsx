import React from 'react';
import PropTypes from 'prop-types';
import MultiListTable from '../MultiListTable';

const SavedSelector = ({
  imageList,
  selectedImages,
  setSelectedImages,
}) => (
  <MultiListTable
    height="80%"
    boxLabel={`Saved Images (${imageList.length})`}
    left={0}
    values={imageList.map(({ created, hash }) => ({
      value: hash,
      data: [hash, created],
    }))}
    value=".."
    width="60%"
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
};

export default SavedSelector;
