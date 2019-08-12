import { connect } from 'react-redux';

const buttons = [
  {
    text: 'Open Port',
    key: 1,
    actionType: 'OPEN_PORT',
  },
  {
    text: 'Configure Port',
    key: 2,
    // actionType: 'CONFIGURE_PORT',
  },
  {
    text: 'Import Dump',
    key: 3,
  },
  {
    text: 'Export',
    key: 4,
  },
  {
    text: 'Animate',
    key: 5,
  },
];

const mapStateToProps = () => ({
  buttons,
});

const mapDispatchToProps = dispatch => ({
  handleMenu: (index) => {
    const pressed = buttons[index];
    if (pressed.actionType) {
      dispatch({
        type: pressed.actionType,
      });
    }
  },
});

export default connect(mapStateToProps, mapDispatchToProps);
