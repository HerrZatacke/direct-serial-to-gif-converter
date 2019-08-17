import React from 'react';
import PropTypes from 'prop-types';
import stylesheet from './stylesheet';

const MainMenu = ({ buttons, handleMenu, inactive }) => (
  <layout
    class={stylesheet.layout}
    keys
  >
    { buttons.map(({ text }, index) => {

      const boxOptions = {
        tags: true,
        class: stylesheet.button,
        content: `{#000000-bg}{#ffffff-fg} ${index + 1}{/}${text}`,
      };

      return (
        (!inactive) ? (
          <button
            key={index}
            {...boxOptions}
            onPress={() => {
              handleMenu(index);
            }}
          />
        ) : (
          <box
            key={index}
            {...boxOptions}
          />
        )
      );
    })}
  </layout>
);

MainMenu.propTypes = {
  buttons: PropTypes.array.isRequired,
  handleMenu: PropTypes.func.isRequired,
  inactive: PropTypes.bool,
};

MainMenu.defaultProps = {
  inactive: false,
};

export default MainMenu;
