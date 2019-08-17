import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import ComSettings from '../ComSettings';
import DumpSelector from '../DumpSelector';
import Progress from '../Progress';
import MainMenu from '../MainMenu';
import SavedSelector from '../SavedSelector';

const getComponent = (activeModule) => {
  switch (activeModule) {
    case 'OPEN_PORT':
      return Progress;
    case 'CONFIG_PORT':
      return ComSettings;
    case 'RAW_DUMPS':
      return DumpSelector;
    case 'IMAGE_LIST':
      return SavedSelector;
    default:
      return null;
  }
};

class ModuleSwitch extends Component {

  shouldComponentUpdate(nextProps) {
    return this.props.activeModule !== nextProps.activeModule;
  }

  render() {
    const ActiveComponent = getComponent(this.props.activeModule);
    return (
      <Fragment>
        {ActiveComponent ? <ActiveComponent /> : null}
        <MainMenu inactive={!!ActiveComponent} />
      </Fragment>
    );
  }
}

ModuleSwitch.propTypes = {
  activeModule: PropTypes.string.isRequired,
};

export default ModuleSwitch;
