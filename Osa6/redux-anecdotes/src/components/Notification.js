import React from "react";

var timeout;

const Notification = props => {
  const style = {
    border: "solid",
    padding: 10,
    borderWidth: 1
  };

  let notification = props.store.getState().notification;

  if (notification === "") {
    return <div />;
  }
  clearTimeout(timeout);
  timeout = setTimeout(() => {
    props.store.dispatch({
      type: "EMPTY"
    });
  }, 5000);
  return (
    <div>
      <div style={style}>{notification}</div>
    </div>
  );
};

export default Notification;
