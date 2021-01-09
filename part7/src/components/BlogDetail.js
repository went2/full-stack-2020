import React from 'react';
import { useDispatch  } from 'react-redux';
import { useParams } from 'react-router-dom';

import { addLikes } from '../reducers/blogReducer';

import CommentForm from './CommentForm';

// material ui 组件
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';

const BlogDetail = ({ blogs }) => {
  const dispatch = useDispatch();

  const id = useParams().id;

  if(blogs.length > 0) {
    // console.log('BlogDetail 组件中的blogs', blogs);
    const blog = blogs.find(n => n.id === id);

    const handleLikesIncrease = blog => {
      dispatch(addLikes(blog));
    };

    return (
      <Box>
        <h3>{blog.title} by {blog.author}</h3>
        <div>url: {blog.url}</div>
        <span>{blog.likes} likes </span>
        <Button
          onClick={() => {handleLikesIncrease(blog)}}
          size='small'
          variant='outlined'
        >+
        </Button>
        <p>由 {blog.user.name} 添加</p>
        <h2>评论</h2>
        <CommentForm blog={blog} />
      </Box>
    );
  }
  return null;
};

export default BlogDetail;