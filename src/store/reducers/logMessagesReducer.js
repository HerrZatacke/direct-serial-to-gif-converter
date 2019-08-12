const logMessagesReducer = (logMessages = [], action) => {
  switch (action.type) {
    case 'LOG_MESSAGE':
      return [`{#ffffff-fg}${(new Date()).toLocaleTimeString()}{/} ${action.payload}`, ...logMessages];
    default:
      return logMessages;
  }
};

export default logMessagesReducer;
