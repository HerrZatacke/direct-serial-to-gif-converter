import path from 'path';
import React from 'react';
import PropTypes from 'prop-types';
import ListTable from '../ListTable';

const DumpSelector = ({
  dumpDir,
  dumpDirContent,
  updateDumpDir,
}) => (
  <ListTable
    height="80%"
    boxLabel={dumpDir}
    left={0}
    values={dumpDirContent}
    value=".."
    width="60%"
    onSelect={(value) => {
      updateDumpDir(path.join(dumpDir, value));
    }}
  />
);

DumpSelector.propTypes = {
  dumpDir: PropTypes.string.isRequired,
  dumpDirContent: PropTypes.arrayOf(PropTypes.shape({
    data: PropTypes.array.isRequired,
    value: PropTypes.string.isRequired,
  })).isRequired,
  updateDumpDir: PropTypes.func.isRequired,
};

export default DumpSelector;
