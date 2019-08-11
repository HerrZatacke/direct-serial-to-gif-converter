import { connect } from 'react-redux';

const mapStateToProps = (state, ownProps) => ({
  text: `${ownProps.text} ${state.line}`,
});

const mapDispatchToProps = () => ({
});

export default connect(mapStateToProps, mapDispatchToProps);
