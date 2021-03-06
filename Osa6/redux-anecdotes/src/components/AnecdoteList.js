import React from "react";
import { connect } from "react-redux";
import { voteDispatch } from "../reducers/anecdoteReducer";
import { setNotification } from "../reducers/notificationReducer";

const AnecdoteList = props => {
  const vote = anecdote => {
    props.setNotification(`you voted "${anecdote.content}"`, 5);
    props.voteDispatch(anecdote);
  };

  return (
    <div>
      {props.anecdotesToShow.map(anecdote => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  );
};

const anecdotesToShow = ({ anecdotes, filter }) => {
  anecdotes.sort(function(a, b) {
    return b.votes - a.votes;
  });
  return anecdotes.filter(anecdote =>
    anecdote.content.toUpperCase().includes(filter.toUpperCase())
  );
};

const mapStateToProps = state => {
  return {
    anecdotesToShow: anecdotesToShow(state),
    filter: state.filter
  };
};

const mapDispatchToProps = {
  voteDispatch,
  setNotification
};

const ConnectedAnecdotes = connect(
  mapStateToProps,
  mapDispatchToProps
)(AnecdoteList);

export default ConnectedAnecdotes;
