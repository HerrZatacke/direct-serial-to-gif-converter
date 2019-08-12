import React from 'react';
import PropTypes from 'prop-types';
import stylesheet from './stylesheet';

const MainMenu = ({ buttons, handleMenu }) => (
  <layout class={stylesheet.layout}>
    { buttons.map(({ text, key, actionType }, index) => (
      actionType ? (
        <button
          tags
          key={key}
          class={stylesheet.button}
          content={`{#000000-bg}{#ffffff-fg} ${key}{/}${text}`}
          onPress={() => {
            handleMenu(index);
          }}
        />
      ) : (
        <box
          tags
          key={key}
          class={stylesheet.button}
          content={`{#000000-bg}{#ffffff-fg} ${key}${text}{/}`}
        />
      )
    ))}
  </layout>
);

MainMenu.propTypes = {
  buttons: PropTypes.array.isRequired,
  handleMenu: PropTypes.func.isRequired,
};

export default MainMenu;
