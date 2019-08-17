const selectedImagesReducer = (selectedImages = [], action) => {
  switch (action.type) {
    case 'SET_SELECTED_IMAGES':
      return action.payload;
    default:
      return selectedImages;
  }
};

export default selectedImagesReducer;
