import { connect } from 'react-redux';

const mapStateToProps = state => ({
  imageList: state.imageList,
});

const mapDispatchToProps = () => ({
});

export default connect(mapStateToProps, mapDispatchToProps);
