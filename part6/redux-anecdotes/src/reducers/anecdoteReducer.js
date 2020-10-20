import anecdoteService from '../services/anecdotes';

const reducer = (state = [], action) => {
  switch (action.type) {
    case 'INIT': {
      return action.data;
    }
    case 'VOTE': {
      const id = action.id;
      const anecToChange = state.find(n => n.id === id);
      const changedAnec = {
        ...anecToChange,
        votes: anecToChange.votes + 1,
      };
      return state.map(anec => anec.id !==id ? anec : changedAnec);
    }
    case 'CREATE': {
      return [...state, action.data];
    }
    default:
      return state;
  }
}

export const voteActionCreator = (item) => {
  return async dispatch => {
    const updatedAnec = await anecdoteService.updateAnec(item);
    dispatch({
      type: 'VOTE',
      id: updatedAnec.id
    })
  }
};

export const createAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content);
    dispatch({
      type: 'CREATE',
      data: newAnecdote
    });
  }
}

export const initAnecdotes = () => {
  return async dispatch => {
    const allAnecdotes = await anecdoteService.getAll();
    dispatch({
      type: 'INIT',
      data: allAnecdotes
    });
  };
}

export default reducer;