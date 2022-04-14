const Reducer = (state: any, action: any) => {
  const { type, payload } = action;
  if (type === "INITIAL_VALUE_ACCESS") {
    return {
      _id: payload.id,
      ai: payload.ai,
      messages: payload.messages,
    };
  }
  if (type === "AI_SENSE_ADDRED") {
    return {
      _id: payload.id,
      ai: payload.ai,
      messages: [...state.messages, payload.messages],
    };
  }
  if (type === "USER_MESSAGE_ADDED") {
    return {
      ...state,
      messages: [...state.messages, payload],
    };
  }
  if (type === "ADMIN_MESSAGE_ADDED") {
    return {
      ...state,
      messages: [...state.messages, payload],
    };
  }
  return state;
};

export default Reducer;
