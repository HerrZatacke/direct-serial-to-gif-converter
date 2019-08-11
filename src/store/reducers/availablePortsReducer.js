const availablePortsReducer = (availablePorts = [], action) => {
  switch (action.type) {
    case 'PORTS_AVAILABLE':
      return action.payload;
    default:
      return availablePorts;
  }
};

export default availablePortsReducer;
