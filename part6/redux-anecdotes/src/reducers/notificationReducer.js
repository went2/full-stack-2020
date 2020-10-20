const reducer = (state='', action) => {
  switch(action.type) {
    case 'SHOWCREATE':
      return `you create "${action.content}" `;
    case 'SHOWVOTE':
      return `you vote "${action.content}" `;
    case 'CLEAN':
      return '';
    default:
      return state;
  }
};

// action creator
export const showCreateAnec = content => {
  return {
    type: 'SHOWCREATE',
    content
  }
};

export const showVoteAnec = content => {
  return {
    type: 'SHOWVOTE',
    content
  }
};

export const notificationEraser = () => {
  return {
    type: 'CLEAN'
  }
};


export default reducer;