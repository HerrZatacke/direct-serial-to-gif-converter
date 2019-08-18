const selectedImagesReducer = (selectedImages = [], action) => {
  switch (action.type) {
    case 'SET_SELECTED_IMAGES':
      return action.payload;
    // case 'TRIGGERED_SUB_ACTION':
    //   switch (action.payload) {
    //     case 'SINGLE_FILES':
    //       return [];
    //     default:
    //       return selectedImages;
    //   }
    default:
      return selectedImages;
  }
};

export default selectedImagesReducer;
