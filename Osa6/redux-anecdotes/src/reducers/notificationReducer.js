const initialState = "";

var timeout;

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "EMPTY":
      return "";
    case "NOTIFICATION":
      return action.data.message;
    default:
      return state;
  }
};

export const setNotification = (message, time) => {
  return async dispatch => {
    dispatch({
      type: "NOTIFICATION",
      data: { message }
    });
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      dispatch({
        type: "EMPTY",
        data: {}
      });
    }, time * 1000);
  };
};

export default reducer;
