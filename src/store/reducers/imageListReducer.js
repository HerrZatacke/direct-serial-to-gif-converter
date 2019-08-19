const imageListReducer = (imageList = [], action) => {
  switch (action.type) {
    case 'SET_IMAGE_LIST':
      return action.payload;
    default:
      return imageList;
  }
};

export default imageListReducer;
