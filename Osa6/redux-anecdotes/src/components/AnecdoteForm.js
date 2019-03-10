import React from "react";
import { connect } from "react-redux";
import { createAnecdote } from "../reducers/anecdoteReducer";
import { setNotification } from "../reducers/notificationReducer";

const AnecdoteForm = props => {
  const addAnecdote = async event => {
    
    event.preventDefault();
    const content = event.target.anecdote.value;
    event.target.anecdote.value = "";
    props.setNotification(`you created "${content}"`, 5)
    props.createAnecdote(content);
  };

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div>
          <input name="anecdote" />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    anecdotes: state.anecdotes,
    filter: state.filter
  };
};

const mapDispatchToProps = {
  createAnecdote,
  setNotification
};

const ConnectedAnecdotes = connect(
  mapStateToProps,
  mapDispatchToProps
)(AnecdoteForm);

export default ConnectedAnecdotes;
