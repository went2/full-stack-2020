import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Home from './components/Home';
import Users from './components/Users';

import Message from './components/Message';
import blogService from './services/blogs';

import { initBlogs, addBlog } from './reducers/blogReducer';
import { userAutoLogin, userLogout } from './reducers/userReducer';
import { clearMessage, successMessage } from './reducers/notificationReducer';
import { fetchAllUsers } from './reducers/userListReducer';
import BlogDetail from './components/BlogDetail';
import UserDetail from './components/UserDetail';

// material ui 组件
import Button from '@material-ui/core/Button';


const App = () => {
  const padding = { padding: 7 };

  const dispatch = useDispatch();
  const user = useSelector(state => state.user);
  const blogs = useSelector(state => state.blogs);
  const users = useSelector(state => state.userList);

  useEffect(() => {dispatch(initBlogs())}, [dispatch]);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser');

    if (loggedUserJSON) {
      const parsedUser = JSON.parse(loggedUserJSON);
      dispatch(userAutoLogin(parsedUser));
    }
  }, [dispatch]);

  useEffect(() => {dispatch(fetchAllUsers())}, [dispatch]);
  // console.log('User组件中的userlist', userList);


  const createBlog = async blog => {
    createBlogRef.current.toggleVisibility();
    const res = await blogService.create(blog);
    dispatch(addBlog(res));
    dispatch(successMessage(`${res.title} successfully created`));
    setTimeout(() => { dispatch(clearMessage()) }, 3000);
  };

  const createBlogRef = useRef();

  const handleLogout = () => {
    try {
      dispatch(userLogout());
    } catch (exception) {
      alert(exception);
    }
  };

  return (
    <Router>
      <div>
        <Button><Link style={padding} to='/'>blogs</Link></Button>
        <Button><Link style={padding} to='/users'>users</Link></Button>
        { user === null
          ? null
          : <span>{user.username} 已登录 <Button onSubmit={handleLogout} variant="outlined" color="primary" size="small" >登出</Button></span>
        }
      </div>
      <h1>Blogs App</h1>

      <Message />
      <Switch>
        <Route path='/users/:id'>
          <UserDetail users={users} />
        </Route>
        <Route path='/blogs/:id'>
          <BlogDetail blogs={blogs} />
        </Route>
        <Route path='/users'>
          <Users users={users}/>
        </Route>
        <Route path='/'>
          <Home createBlog={createBlog} createBlogRef={createBlogRef} />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;