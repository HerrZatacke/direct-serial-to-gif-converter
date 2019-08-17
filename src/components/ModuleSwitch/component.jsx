import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import ComSettings from '../ComSettings';
import DumpSelector from '../DumpSelector';
import Progress from '../Progress';
import MainMenu from '../MainMenu';
import SavedSelector from '../SavedSelector';
import Console from '../Console';

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

const ModuleSwitch = (props) => {
  const ActiveComponent = getComponent(props.activeModule);
  const leftWidth = Math.ceil(props.width * 0.6);
  const rightWidth = props.width - leftWidth + 1;

  return (
    <Fragment>
      {ActiveComponent ? <ActiveComponent width={leftWidth} /> : null}
      <Console width={rightWidth} />
      <MainMenu inactive={!!ActiveComponent} />
    </Fragment>
  );
};

ModuleSwitch.propTypes = {
  activeModule: PropTypes.string.isRequired,
  width: PropTypes.number.isRequired,
};

export default ModuleSwitch;
