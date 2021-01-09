import React from 'react';
import Button from '@material-ui/core/Button';

const LoginForm = ({ handleLogin, username, setUsername, password, setPassword }) => {
  return (
    <div>
      <h2>登陆</h2>
      <form onSubmit={handleLogin}>
        <div>
          用户名:
          <input
            type='text'
            placeholder='输入用户名'
            value={username}
            name='Username'
            onChange={e => { setUsername(e.target.value) }}
          />
        </div>
        <div>
          密码:
          <input
            type='password'
            placeholder='输入密码'
            value={password}
            name='Password'
            onChange={e => { setPassword(e.target.value) }}
          />
        </div>
        <Button type='submit' variant="outlined" color="primary" >登陆</Button>
      </form>
    </div>
  )
};

export default LoginForm;