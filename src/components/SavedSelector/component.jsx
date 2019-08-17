import React from 'react';
import PropTypes from 'prop-types';
import ListTable from '../ListTable';

const SavedSelector = ({
  imageList,
}) => (
  <ListTable
    height="80%"
    boxLabel={`Saved Images (${imageList.length})`}
    left={0}
    values={imageList.map(({ created, hash }) => ({
      value: hash,
      data: [hash, (new Date(created)).toLocaleString()],
    }))}
    value=".."
    width="60%"
    onSelect={(value) => {
      // eslint-disable-next-line no-console
      console.log(value);
    }}
  />
);

SavedSelector.propTypes = {
  imageList: PropTypes.arrayOf(PropTypes.shape({
    binary: PropTypes.array.isRequired,
    hash: PropTypes.string.isRequired,
    created: PropTypes.number.isRequired,
  })).isRequired,
};

export default SavedSelector;
