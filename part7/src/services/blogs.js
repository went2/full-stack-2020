import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null;

const setToken = newToken => {
  token = `bearer ${newToken}`;
};

const getAll = async () => {
  const res = await axios.get(baseUrl);
  return res.data;
}

const create = async newObject => {
  const config = {
    headers : { Authorization: token }
  }
  const response = await axios.post(baseUrl, newObject, config);
  return response.data;
};

const remove = async blog => {
  return await axios.delete(`${baseUrl}/${blog.id}`);
};

const updateLikes = async blog => {
  try {
    const response = await axios.put(`${baseUrl}/${blog.id}`, blog);
    return response.data;
  }
  catch(err) {
    throw console.error(err);
  }
};

// 向服务器请求添加comment的异步函数
// 参数 { blog: {}, comment: '' }
// 返回: 添加 comment 后的 blog 对象
const addComments = async obj => {
  try {
    const res = await axios.put(`${baseUrl}/${obj.blog.id}/comments`, obj);
    return res.data;
  }
  catch(err)
  {
    throw console.error(err);
  }
};

export default {
  getAll,
  create,
  remove,
  updateLikes,
  addComments,
  setToken
}