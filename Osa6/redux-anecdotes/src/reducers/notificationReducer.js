const initialState = "Tervetuloa!";

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "EMPTY":
      return "";
    case "VOTE":
      return `you voted "${action.data.content}"`;

    case "NEW_ANECDOTE":
      return `you created "${action.data.content}"`;
    default:
      return state;
  }
};

export default reducer;
