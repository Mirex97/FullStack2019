import anecdoteService from "../services/anecdotes";
const getId = () => (100000 * Math.random()).toFixed(0);

export const createAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content);
    dispatch({
      type: "NEW_ANECDOTE",
      data: newAnecdote
    });
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

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll();
    dispatch({
      type: "INIT_ANECDOTES",
      data: anecdotes
    });
  };
};

export const voteDispatch = id => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.vote(id);
    dispatch({
      type: "VOTE",
      data: newAnecdote
    });
  };
};

export default { reducer, createAnecdote };
