import React, { useState } from 'react';

// material ui 组件
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';

const CreateBlog = ({ createBlog }) => {

  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');

  const handleCreateBlog = async e => {
    e.preventDefault();

    const newBlog = { title, author, url };
    createBlog(newBlog);
    setTitle('');
    setAuthor('');
    setUrl('');
  }

  return (
    <form onSubmit={handleCreateBlog}>
      <Box>
        title:
        <Input
          id='title'
          type='text'
          placeholder='输入标题'
          name='Title'
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
      </Box>
      <Box>
        author:
        <Input
          id='author'
          type='text'
          placeholder='输入作者'
          name='Author'
          value={author}
          onChange={e => setAuthor(e.target.value)}
        />
      </Box>
      <Box>
        url:
        <Input
          id='url'
          type='text'
          placeholder='输入url'
          name='Url'
          value={url}
          onChange={e => setUrl(e.target.value)}
        />
      </Box>
      <Button
        type='submit'
        id='submitButton'
        variant="contained"
        color="primary"
      >提交</Button>
    </form>
  )
};

export default CreateBlog;