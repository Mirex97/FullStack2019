import React from "react";
import { connect } from "react-redux";
import {
  setNotification
} from "../reducers/notificationReducer";

const Notification = props => {
  const style = {
    border: "solid",
    padding: 10,
    borderWidth: 1
  };


  if (props.notification === "") {
    return <div />;
  }
  return (
    <div>
      <div style={style}>{props.notification}</div>
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
  setNotification
};

const ConnectedNotification = connect(
  mapStateToProps,
  mapDispatchToProps
)(Notification);

export default ConnectedNotification;
