import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import ComSettings from '../ComSettings';
import DumpSelector from '../DumpSelector';
import Progress from '../Progress';
import MainMenu from '../MainMenu';

const ModuleSwitch = ({ activeModule }) => {
  switch (activeModule) {
    case 'OPEN_PORT':
      return (
        <Fragment>
          <Progress />
          <MainMenu inactive />
        </Fragment>
      );
    case 'CONFIG_PORT':
      return (
        <Fragment>
          <ComSettings />
          <MainMenu inactive />
        </Fragment>
      );
    case 'RAW_DUMPS':
      return (
        <Fragment>
          <DumpSelector />
          <MainMenu inactive />
        </Fragment>
      );
    default:
      return <MainMenu />;
  }
};

ModuleSwitch.propTypes = {
  activeModule: PropTypes.string.isRequired,
};

export default ModuleSwitch;