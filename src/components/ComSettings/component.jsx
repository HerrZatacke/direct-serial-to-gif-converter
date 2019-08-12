import React from 'react';
import PropTypes from 'prop-types';
import stylesheet from './stylesheet';

const ComSettings = ({
  availablePorts,
  portConfig,
  listPorts,
  updatePortConfig,
  width,
}) => {

  const lists = [
    {
      key: 'comName',
      label: 'Port Name',
      values: ['Refresh', ...availablePorts],
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
  let remainingWidth = width;

  return (
    <box
      class={stylesheet.box}
      height={height}
    >
      {
        lists.map((item, index) => {
          const elementWidth = Math.ceil(remainingWidth / (lists.length - index));
          const elementOffset = width - remainingWidth;
          remainingWidth -= elementWidth;

          return (
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
              height={height + 2}
              width={elementWidth}
              left={elementOffset}
              keys
              onSelectItem={(_, selectedIndex) => {
                if (index !== 0 || selectedIndex !== 0) {
                  updatePortConfig({
                    [item.key]: item.values[selectedIndex],
                  });
                }
              }}
              onSelect={(_, selectedIndex) => {
                if (index === 0 && selectedIndex === 0) {
                  listPorts();
                }
              }}
            />
          );
        })
      }
    </box>
  );
};

ComSettings.propTypes = {
  availablePorts: PropTypes.array.isRequired,
  portConfig: PropTypes.object.isRequired,
  listPorts: PropTypes.func.isRequired,
  updatePortConfig: PropTypes.func.isRequired,
  width: PropTypes.number.isRequired,
};

export default ComSettings;
