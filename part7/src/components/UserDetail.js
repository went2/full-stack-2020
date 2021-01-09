import React from 'react';
import { Link, useParams } from 'react-router-dom';

const UserDetail = ({ users }) => {
  const id = useParams().id;

  if (users.length > 0) {
    // console.log('接收到的users', users);
    const user = users.find(n => n._id === id);
    return (
      <div>
        <h2>{user.name}</h2>
        <p><strong>创建的blogs</strong></p>
        {
          user.blogs.length === 0
            ? <div>哦，没有任何blog</div>
            : user.blogs.map(blog => <li key={blog.id}>{blog.title}</li>)
        }
      </div>
    );
  } else return <Link to='/'>请先返回主页</Link>

};

export default UserDetail;