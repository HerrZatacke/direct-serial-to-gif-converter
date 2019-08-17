import { connect } from 'react-redux';

const mapStateToProps = state => ({
  messages: state.logMessages,
  width: state.screenSize.columns.right,
});

const mapDispatchToProps = () => ({
});

export default connect(mapStateToProps, mapDispatchToProps);
