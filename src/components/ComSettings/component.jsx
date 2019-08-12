import React from 'react';
import PropTypes from 'prop-types';
import stylesheet from './stylesheet';

const ComSettings = ({ availablePorts, portConfig, updatePortConfig }) => {

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

  const height = Math.min(5, Math.max(...lists.map(({ values }) => values.length)));
  const width = Math.ceil(100 / lists.length);

  console.log(width);

  return (
    <box
      class={stylesheet.box}
      height={availablePorts.length + 4}
    >
      {
        lists.map((item, index) => (
          <list
            key={item.key}
            ref={(node) => {
              if (node) {
                const current = item.values.findIndex(val => val === item.selected.toString(10));
                if (current !== -1) {
                  node.select(current);
                }
              }
            }}
            class={stylesheet.list}
            label={`${item.label} (${item.selected})`}
            items={item.values}
            width={`${width}%`}
            left={`${width * index}%`}
            height={height + 2}
            select={1}
            keys
            onSelectItem={(_, selectedIndex) => {
              updatePortConfig({
                [item.key]: item.values[selectedIndex],
              });
            }}
          />
        ))
      }
    </box>
  );
};

ComSettings.propTypes = {
  availablePorts: PropTypes.array.isRequired,
  portConfig: PropTypes.object.isRequired,
  updatePortConfig: PropTypes.func.isRequired,
};

export default ComSettings;
