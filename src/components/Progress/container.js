import { connect } from 'react-redux';

const mapStateToProps = state => ({
  value: state.lines * 100 / 360,
  width: state.screenSize.columns.left,
});

const mapDispatchToProps = () => ({
});

export default connect(mapStateToProps, mapDispatchToProps);
