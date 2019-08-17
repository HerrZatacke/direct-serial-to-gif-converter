import React from 'react';
import PropTypes from 'prop-types';
import ComSettings from '../ComSettings';
import DumpSelector from '../DumpSelector';
import Progress from '../Progress';
import SavedSelector from '../SavedSelector';

const ModuleSwitch = (props) => {
  switch (props.activeModule) {
    case 'OPEN_PORT':
      return <Progress />;
    case 'CONFIG_PORT':
      return <ComSettings />;
    case 'RAW_DUMPS':
      return <DumpSelector />;
    case 'IMAGE_LIST':
      return <SavedSelector />;
    default:
      return null;
  }
};

ModuleSwitch.propTypes = {
  activeModule: PropTypes.string.isRequired,
};

export default ModuleSwitch;
