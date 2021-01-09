import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { Link } from 'react-router-dom';

import { deleteBlog } from '../reducers/blogReducer';

import CreateBlog from './CreateBlog';
import Toggle from './Toggle';

const BlogList = ({ createBlog, createBlogRef }) => {

  const dispatch = useDispatch();

  const blogs = useSelector(state => state.blogs);
  console.log('这个组件被渲染了，其blogs是', blogs);

  const handleDelete = blog => {
    console.log('将被删掉的blogid是：',blog.id)
    dispatch(deleteBlog(blog));
  };

  // console.log('BlogList组件中的blogs', blogs);

  return (
    <div>
      <Toggle buttonLabel='创建Blogs' ref={createBlogRef}>
        <CreateBlog
          createBlog={createBlog}
        />
      </Toggle>
      {
        blogs.map(blog =>
          <li key={blog.id}>
            <Link to={`/blogs/${blog.id}`}>
              {blog.title} by {blog.author}
            </Link>
          </li>
        )
      }
    </div>
  )
}

export default BlogList;
