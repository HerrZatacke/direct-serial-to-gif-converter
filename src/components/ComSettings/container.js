import { connect } from 'react-redux';

const mapStateToProps = state => ({
  availablePorts: state.availablePorts,
  portConfig: state.config.portConfig,
  width: state.screenSize.width,
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
  listPorts: () => {
    dispatch({
      type: 'LIST_PORTS',
    });
  },
});

export default connect(mapStateToProps, mapDispatchToProps);
