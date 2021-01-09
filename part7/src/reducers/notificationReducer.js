
const notificationReducer = (state = {}, action) => {
  switch(action.type) {
  case 'SUCCESS':
    return { content: action.data, error: false };
  case 'ERROR':
    return { content: action.data, error: true };
  case 'CLEAR':
    return { content: null, error: true };
  default:
    return state;
  }
};

export const successMessage = info => {
  return {
    type: 'SUCCESS',
    data: info
  };
};

export const errorMessage = info => {
  return {
    type: 'ERROR',
    data: info
  };
};

export const clearMessage = () => {
  return {
    type: 'CLEAR'
  }
}


export default notificationReducer;