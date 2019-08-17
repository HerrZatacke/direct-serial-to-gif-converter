import { connect } from 'react-redux';

const mapStateToProps = state => ({
  availablePorts: state.availablePorts,
  portConfig: state.config.portConfig,
});

const mapDispatchToProps = dispatch => ({
  updatePortConfig: (newValue) => {
    dispatch({
      type: 'SET_CONFIG',
      payload: {
        portConfig: newValue,
      },
    });
  },
});

export default connect(mapStateToProps, mapDispatchToProps);
