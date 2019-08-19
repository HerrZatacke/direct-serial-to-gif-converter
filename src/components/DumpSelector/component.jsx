import path from 'path';
import React from 'react';
import PropTypes from 'prop-types';
import ListTable from '../ListTable';
import { columnStyles } from './stylesheet';

const DumpSelector = ({
  dumpDir,
  dumpDirContent,
  updateDumpDir,
  width,
}) => (
  <ListTable
    height="100%-1"
    boxLabel={dumpDir}
    left={0}
    values={dumpDirContent}
    value=".."
    width={width}
    columnStyles={columnStyles}
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
  width: PropTypes.number.isRequired,
};

export default DumpSelector;
