import { connect } from 'react-redux';

const mapStateToProps = state => ({
  messages: state.logMessages,
});

const mapDispatchToProps = () => ({
});

export default connect(mapStateToProps, mapDispatchToProps);
