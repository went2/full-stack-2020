import userService from '../services/users'

const userListReducer = (state = [], action) => {
  switch(action.type) {
  case 'ALLUSERS':
    return action.data;
  default:
    return state;
  }
}

export const fetchAllUsers = () => {
  return async dispatch => {
    const res = await userService.getAllUsers();
    // console.log('userList获取的数据', res)
    dispatch({
      type: 'ALLUSERS',
      data: res
    });
  }
};

export default userListReducer;
