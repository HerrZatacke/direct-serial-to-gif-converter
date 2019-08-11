import { connect } from 'react-redux';

const mapStateToProps = (state) => {
  let comName;

  try {
    // eslint-disable-next-line prefer-destructuring
    comName = state.config.portConfig.comName;
  } catch (err) {
    comName = '';
  }
  return ({
    comName,
  });
};

const mapDispatchToProps = () => ({
});

export default connect(mapStateToProps, mapDispatchToProps);
