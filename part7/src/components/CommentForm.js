import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import { submitComments } from '../reducers/blogReducer';

// material ui 组件
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';

const CommentForm = ({ blog }) => {

  const [commentCotent, setCommentContent] = useState('');
  const dispatch = useDispatch();

  const handleLogin = e => {
    e.preventDefault();
    setCommentContent('');

    // 发往服务器的对象，http put 方法中的body内容，格式后端和前端约定一致即可
    const blogToBeSent = {
      blog,
      comment: commentCotent
    }

    dispatch(submitComments(blogToBeSent));

  }

  return (
    <Box>
      <form onSubmit={handleLogin}>
        <Input
          name='comment'
          value={commentCotent}
          onChange={e => {setCommentContent(e.target.value)}}
          inputProps={{ 'aria-label': 'description' }}
        />
        <Button
          type='submit'
          variant='contained'
          color='primary'
          size='small'
        >提交</Button>
      </form>
      {
        blog.comments === undefined ? null : blog.comments.map(item => <li key={item}>{item}</li>)
      }
    </Box>
  )
}

export default CommentForm;