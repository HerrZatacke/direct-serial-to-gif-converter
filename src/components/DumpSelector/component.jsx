import path from 'path';
import React from 'react';
import PropTypes from 'prop-types';
// import stylesheet from './stylesheet';
import CheckableList from '../CheckableList';

const DumpSelector = ({
  dumpDir,
  dumpDirContent,
  updateDumpDir,
}) => (
  <CheckableList
    height="80%"
    label={dumpDir}
    left={0}
    values={dumpDirContent}
    value=".."
    width="60%"
    content={dumpDirContent.join('\n')}
    onSelect={(value) => {
      updateDumpDir(path.join(dumpDir, value));
    }}
  />
);

DumpSelector.propTypes = {
  dumpDir: PropTypes.string.isRequired,
  dumpDirContent: PropTypes.arrayOf(PropTypes.string).isRequired,
  updateDumpDir: PropTypes.func.isRequired,
};

export default DumpSelector;
