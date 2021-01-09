import blogService from '../services/blogs';

const blogReducer = (state = [], action) => {
  switch (action.type) {
  case 'INIT':
    return action.data;
  case 'ADD':
    return state.concat(action.data);
  case 'DELETE':
    return state.filter(item => item.id !== action.data);
  case 'ADDLIKES':
    return state.map(item => item.id === action.data.id ? action.data : item);
  case 'ADDCOMMENTS':
    return state.map(item => item.id === action.data.id ? action.data : item);
  default:
    return state;
  }
};

export const initBlogs = () => {
  return async dispatch => {
    const allBlogs = await blogService.getAll();
    dispatch({
      type: 'INIT',
      data: allBlogs
    })
  };
};

export const addBlog = blog => {
  return async dispatch => {
    const createdBlog = await blogService.create(blog);
    dispatch({
      type: 'ADD',
      data: createdBlog
    })
  };
};

export const deleteBlog = blog => {
  return async dispatch => {
    await blogService.remove(blog);
    dispatch({
      type: 'DELETE',
      data: blog.id
    });
  };
};

export const addLikes = blog => {
  return async dispatch => {
    const updatedBlog = { ...blog, likes: blog.likes + 1 };
    const returnedBlog = await blogService.updateLikes(updatedBlog);
    dispatch({
      type: 'ADDLIKES',
      data: returnedBlog
    });
  };
};

export const submitComments = obj => {
  return async dispatch => {
    const returnedBlog = await blogService.addComments(obj);
    dispatch({
      type: 'ADDCOMMENTS',
      data: returnedBlog
    });
  };
};

export default blogReducer;
