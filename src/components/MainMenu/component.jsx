import React, { Component } from 'react';
import PropTypes from 'prop-types';
import stylesheet from './stylesheet';

class MainMenu extends Component {

  constructor(props) {
    super(props);
    this.node = null;
  }

  componentDidMount() {
    this.node.children[0].focus();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.inactive && !this.props.inactive) {
      this.node.children[0].focus();
    }
  }

  render() {
    const {
      buttons,
      handleMenu,
      inactive,
    } = this.props;

    return (
      <layout
        class={stylesheet.layout}
        ref={(node) => {
          this.node = node;
        }}
        keys
      >
        {buttons.map(({ text, sendKey }, index) => {
          const boxOptions = {
            tags: true,
            class: stylesheet.button,
            content: `{#000000-bg}{#ffffff-fg} ${index + 1}{/}${text}`,
          };

          return (
            (!inactive) ? (
              <button
                key={`button-${text}`}
                {...boxOptions}
                onPress={() => {
                  handleMenu(sendKey);
                }}
              />
            ) : (
              <box
                key={`inactive-button-${text}`}
                {...boxOptions}
              />
            )
          );
        })}
      </layout>
    );
  }
}

MainMenu.propTypes = {
  buttons: PropTypes.array.isRequired,
  handleMenu: PropTypes.func.isRequired,
  inactive: PropTypes.bool,
};

MainMenu.defaultProps = {
  inactive: false,
};

export default MainMenu;
