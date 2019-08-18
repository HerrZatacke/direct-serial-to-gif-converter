import { connect } from 'react-redux';
import mainMenuButtons from '../../static/mainMenuButtons';

const mapStateToProps = state => ({
  buttons: mainMenuButtons,
  inactive: !!state.activeModule,
});

const mapDispatchToProps = dispatch => ({
  handleMenu: (index) => {
    const pressed = mainMenuButtons[index];
    if (pressed.moduleId) {
      dispatch({
        type: 'MENU_KEYPRESS',
        payload: pressed.sendKey,
      });
    }
  },
});

export default connect(mapStateToProps, mapDispatchToProps);
