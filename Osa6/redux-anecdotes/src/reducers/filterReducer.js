const initialState = "";

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "FILTER":
      return action.data.content;
    default:
      return state;
  }
};

export default reducer;
