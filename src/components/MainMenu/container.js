import { connect } from 'react-redux';
import mainMenuButtons from '../../mainMenuButtons';

const mapStateToProps = state => ({
  buttons: mainMenuButtons,
  inactive: !!state.activeModule,
});

const mapDispatchToProps = dispatch => ({
  handleMenu: (index) => {
    const pressed = mainMenuButtons[index];
    if (pressed.moduleId) {
      dispatch({
        type: 'SET_ACTIVE_MODULE',
        payload: pressed.moduleId,
      });
    }
  },
});

export default connect(mapStateToProps, mapDispatchToProps);
