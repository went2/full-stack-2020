import loginService from '../services/login';
import blogService from '../services/blogs';
import { errorMessage, clearMessage } from './notificationReducer';

const userReducer = (state = null, action) => {
  switch(action.type) {
  case 'LOGIN':
    return action.data;
  case 'AUTOLOGIN':
    return action.data;
  case 'LOGOUT':
    return null;
  default:
    return state;
  }
};

export const userLogin = ({ username, password }) => {
  //console.log('reducer接收到的用户名和密码：', username, password )
  return async dispatch => {
    try {
      const response = await loginService.login({ username, password });
      //console.log('登录时接收到的服务器返回：', response);
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(response));
      blogService.setToken(response.token);
      dispatch({
        type: 'LOGIN',
        data: response
      });
    } catch(error) {
      dispatch(errorMessage(`登陆失败，错误消息:${error}`))
      setTimeout(() => { dispatch(clearMessage()) }, 3000);
    }
  }
};

export const userAutoLogin = parsedUser => {
  blogService.setToken(parsedUser.token);
  return {
    type: 'AUTOLOGIN',
    data: parsedUser
  };
};

export const userLogout = () => {
  window.localStorage.removeItem('loggedBlogappUser');
  return {
    type: 'LOGOUT'
  };
};

export default userReducer;

