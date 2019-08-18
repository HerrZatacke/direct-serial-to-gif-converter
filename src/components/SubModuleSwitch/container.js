import { connect } from 'react-redux';

const mapStateToProps = state => ({
  activeSubModule: state.activeSubModule,
  // width: state.screenSize.width,
});

const mapDispatchToProps = () => ({
});

export default connect(mapStateToProps, mapDispatchToProps);
