import React from 'react';
import PropTypes from 'prop-types';
import stylesheet from './stylesheet';

const MainMenu = ({ buttons, handleMenu, inactive }) => (
  <layout
    class={stylesheet.layout}
    keys
  >
    { buttons.map(({ text, key }, index) => {

      const boxOptions = {
        tags: true,
        class: stylesheet.button,
        content: `{#000000-bg}{#ffffff-fg} ${key}{/}${text}`,
      };

      return (
        (!inactive) ? (
          <button
            key={key}
            {...boxOptions}
            onPress={() => {
              handleMenu(index);
            }}
          />
        ) : (
          <box
            key={key}
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
