const selectedPalettesReducer = (selectedPalettes = [], action) => {
  switch (action.type) {
    case 'SET_SELECTED_PALETTES':
      return action.payload;
    default:
      return selectedPalettes;
  }
};

export default selectedPalettesReducer;
