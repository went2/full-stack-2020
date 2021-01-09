import axios from 'axios';
const baseUrl = '/api/users';

const getAllUsers = async() => {
  const res = await axios.get(baseUrl);
  //console.log('getAllUsers获取到的返回', res.data);
  return res.data;
}

export default { getAllUsers };