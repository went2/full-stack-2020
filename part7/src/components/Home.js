import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Toggle from './Toggle';
import LoginForm from './Login';
import BlogList from './BlogList';
import { userLogin } from '../reducers/userReducer';

const Home = ({ createBlog, createBlogRef }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const user = useSelector(state => state.user);

  const handleLogin = async e => {
    e.preventDefault();
    dispatch(userLogin({ username, password }))
    setUsername('');
    setPassword('');
  };

  if (user === null) {
    return (
      <Toggle buttonLabel='登陆'>
        <LoginForm
          handleLogin = {handleLogin}
          username = {username}
          setUsername = {setUsername}
          password = {password}
          setPassword = {setPassword}
        />
      </Toggle>
    );
  } else return(
    <BlogList
      createBlog={createBlog}
      createBlogRef={createBlogRef}
    />
  );
};

export default Home;