import { connect } from 'react-redux';

const mapStateToProps = state => ({
  portConfig: state.config.portConfig,
});

const mapDispatchToProps = () => ({
});

export default connect(mapStateToProps, mapDispatchToProps);
