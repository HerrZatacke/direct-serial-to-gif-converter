import { connect } from 'react-redux';

const mapStateToProps = state => ({
  activeModule: state.activeModule,
});

const mapDispatchToProps = () => ({
});

export default connect(mapStateToProps, mapDispatchToProps);
