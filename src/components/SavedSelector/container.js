import { connect } from 'react-redux';

const mapStateToProps = state => ({
  imageList: state.imageList,
  selectedImages: state.selectedImages,
  width: state.screenSize.columns.left,
  subModuleOpened: !!state.activeSubModule,
});

const mapDispatchToProps = dispatch => ({
  setSelectedImages: (selectedImages) => {
    dispatch({
      type: 'SET_SELECTED_IMAGES',
      payload: selectedImages,
    });
  },
});

export default connect(mapStateToProps, mapDispatchToProps);
