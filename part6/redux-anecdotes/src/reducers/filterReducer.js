const filterReducer = (state='', action) => {
  switch(action.type) {
    case 'FILTER':
      return action.input;
    default:
      return state;
  }
};

export const filterAction = (input) => {
  return {
    type: 'FILTER',
    input
  }
}

export default filterReducer;