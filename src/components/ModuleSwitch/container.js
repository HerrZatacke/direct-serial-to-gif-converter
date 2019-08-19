import { connect } from 'react-redux';

const mapStateToProps = state => ({
  activeModule: state.activeModule,
  width: state.screenSize.width,
});

const mapDispatchToProps = () => ({
});

export default connect(mapStateToProps, mapDispatchToProps);
