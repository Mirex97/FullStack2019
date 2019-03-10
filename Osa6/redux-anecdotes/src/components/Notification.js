import React from "react";
import { connect } from "react-redux";
import { emptyNotification } from "../reducers/notificationReducer";

var timeout;

const Notification = props => {
  const style = {
    border: "solid",
    padding: 10,
    borderWidth: 1
  };

  let notification = props.notification;

  if (notification === "") {
    return <div />;
  }
  clearTimeout(timeout);
  timeout = setTimeout(() => {
    props.emptyNotification();
  }, 5000);
  return (
    <div>
      <div style={style}>{notification}</div>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    notification: state.notification,
    anecdotes: state.anecdotes
  };
};

const mapDispatchToProps = {
  emptyNotification
};

const ConnectedNotification = connect(
  mapStateToProps,
  mapDispatchToProps
)(Notification);

export default ConnectedNotification;
