import { connect } from 'react-redux';

const mapStateToProps = state => ({
  buttons: state.menuOptions,
  inactive: !!state.activeModule,
});

const mapDispatchToProps = dispatch => ({
  handleMenu: (key) => {
    dispatch({
      type: 'MENU_KEYPRESS',
      payload: key,
    });
  },
});

export default connect(mapStateToProps, mapDispatchToProps);
