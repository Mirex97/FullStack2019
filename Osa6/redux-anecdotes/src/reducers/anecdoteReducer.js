const getId = () => (100000 * Math.random()).toFixed(0);



export const createAnecdote = content => {
  return {
    type: "NEW_ANECDOTE",
    data: {
      content
    }
  };
};

const reducer = (state = [], action) => {
  switch (action.type) {
    case "VOTE":
      const id = action.data.id;
      const voteToChange = state.find(n => n.id === id);
      const changedVote = { ...voteToChange, votes: voteToChange.votes + 1 };
      return state.map(vote => (vote.id !== id ? vote : changedVote));

    case "NEW_ANECDOTE":
      return state.concat({
        content: action.data.content,
        id: getId(),
        votes: 0
      });

    case "INIT_ANECDOTES":
      return action.data;
    default:
      return state;
  }
};

export const initializeAnecdotes = anecdotes => {
  return {
    type: "INIT_ANECDOTES",
    data: anecdotes
  };
};

export const voteDispatch = anecdote => {
  return {
    type: "VOTE",
    data: { id: anecdote.id, content: anecdote.content }
  };
};

export default { reducer, createAnecdote };
