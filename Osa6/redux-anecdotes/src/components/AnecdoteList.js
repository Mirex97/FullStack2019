import React from "react";

const AnecdoteList = props => {
  let anecdotes = props.store.getState().anecdotes;
  anecdotes.sort(function(a, b) {
    return b.votes - a.votes;
  });

  const vote = anecdote => {
    console.log("vote", anecdote.id);
    props.store.dispatch({
      type: "VOTE",
      data: { id: anecdote.id, content: anecdote.content }
    });
  };

  anecdotes = anecdotes.filter(anecdote =>
    anecdote.content
      .toUpperCase()
      .includes(props.store.getState().filter.toUpperCase())
  );
  return (
    <div>
      {anecdotes.map(anecdote => (
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

export default AnecdoteList;
