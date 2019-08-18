import { connect } from 'react-redux';

const menuOptions = [
  {
    label: 'Single Files',
    value: 'SINGLE_FILES',
  },
  {
    label: 'Animation',
    value: 'ANIMATION',
  },
  {
    label: 'R-G-B',
    value: 'RGB',
  },
];

const mapStateToProps = () => ({
  menuOptions,
});

const mapDispatchToProps = dispatch => ({
  selectMenuOption: (option) => {
    dispatch({
      type: 'TRIGGERED_SUB_ACTION',
      payload: option,
    });
  },
});

export default connect(mapStateToProps, mapDispatchToProps);
