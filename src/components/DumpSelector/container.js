import { connect } from 'react-redux';

const mapStateToProps = state => ({
  dumpDir: state.dumpDir,
  dumpDirContent: state.dumpDirContent,
});

const mapDispatchToProps = dispatch => ({
  updateDumpDir: (newDir) => {
    dispatch({
      type: 'SELECT_DUMP_DIR_FILE',
      payload: newDir,
    });
  },
});

export default connect(mapStateToProps, mapDispatchToProps);
