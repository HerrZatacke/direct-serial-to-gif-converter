import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import stylesheet from './stylesheet';
import List from '../List';

class ComSettings extends Component {

  constructor(props) {
    super(props);
    this.node = null;
  }

  componentDidMount() {
    this.node.children[0].focus();
  }

  render() {
    const {
      availablePorts,
      portConfig,
      updatePortConfig,
      width,
    } = this.props;

    const lists = [
      {
        key: 'comName',
        label: 'Port Name',
        values: availablePorts,
        selected: portConfig.comName,
      },
      {
        key: 'baudRate',
        label: 'Baudrate',
        values: ['9600', '14400', '19200', '38400', '57600', '115200', '128000', '256000'],
        selected: portConfig.baudRate,
      },
      {
        key: 'dataBits',
        label: 'Databits',
        values: ['7', '8'],
        selected: portConfig.dataBits,
      },
      {
        key: 'stopBits',
        label: 'Stopbits',
        values: ['0', '1'],
        selected: portConfig.stopBits,
      },
      {
        key: 'parity',
        label: 'Parity',
        values: ['even', 'odd'],
        selected: portConfig.parity,
      },
    ];

    const height = 2 + Math.min(10, Math.max(...lists.map(({ values }) => values.length)));
    let remainingWidth = width;

    return (
      <Fragment>
        <box
          class={stylesheet.box}
          height={height}
          width={width}
          ref={(node) => {
            this.node = node || this.node;
          }}
        >
          {
            lists.map((item, index) => {
              const elementWidth = Math.ceil(remainingWidth / (lists.length - index));
              const elementOffset = width - remainingWidth;
              remainingWidth -= elementWidth;

              return (
                <List
                  checkMark="■"
                  key={item.key}
                  boxLabel={item.label}
                  value={item.selected}
                  values={item.values.map(value => ({
                    label: value,
                    value,
                  }))}
                  height={height}
                  width={elementWidth}
                  left={elementOffset}
                  onSelect={(value) => {
                    updatePortConfig({
                      [item.key]: value,
                    });
                  }}
                />
              );
            })
          }
        </box>
        <box
          top={height}
          width={width - 1}
          class={stylesheet.infobox}
          content={`${portConfig.comName} ${portConfig.baudRate} ${portConfig.dataBits} ${portConfig.stopBits} ${portConfig.parity}`}
        />
      </Fragment>
    );
  }
}

ComSettings.propTypes = {
  availablePorts: PropTypes.array.isRequired,
  portConfig: PropTypes.object.isRequired,
  updatePortConfig: PropTypes.func.isRequired,
  width: PropTypes.number.isRequired,
};

export default ComSettings;
