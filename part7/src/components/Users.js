import React from 'react';
import { Link } from 'react-router-dom';

const Users = ({ users }) => {

  return (
    <div>
      <h2>所有用户</h2>
      <table>
        <tbody>
          <tr><td>姓名</td><td>创建的blogs</td></tr>
          {
            users.map(user => <tr key={user._id}><td><Link to={`/users/${user._id}`}>{user.username}</Link></td><td>{user.blogs.length}</td></tr>)
          }
        </tbody>
      </table>
    </div>
  );
};

export default Users;
