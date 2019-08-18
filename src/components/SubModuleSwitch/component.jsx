import React from 'react';
import PropTypes from 'prop-types';
import ExportOptions from '../ExportOptions/component';

const SubModuleSwitch = (props) => {
  switch (props.activeSubModule) {
    case 'EXPORT_OPTIONS':
      return <ExportOptions />;
    default:
      return null;
  }
};

SubModuleSwitch.propTypes = {
  activeSubModule: PropTypes.string.isRequired,
};

export default SubModuleSwitch;
