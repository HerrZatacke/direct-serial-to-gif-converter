import { connect } from 'react-redux';
import palettes from '../../../res/palettes';

const mapStateToProps = state => ({
  width: state.screenSize.columns.left,
  palettes,
  selectedPalettes: state.selectedPalettes,
  subModuleOpened: !!state.activeSubModule,
});

const mapDispatchToProps = dispatch => ({
  setSelectedPalettes: (selectedPalettes) => {
    dispatch({
      type: 'SET_SELECTED_PALETTES',
      payload: selectedPalettes,
    });
  },
});

export default connect(mapStateToProps, mapDispatchToProps);
