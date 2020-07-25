import axios from 'axios';
const baseUrl = 'http://localhost:3001/persons';

const getAll = function() {
  return axios.get(baseUrl).then(res => res.data);
};

const create = function(newObject) {
  return axios.post(baseUrl, newObject).then(res => res.data);
};

const update = function(id, newObject) {
  return axios.put(`${baseUrl}/${id}`, newObject).then(res => res.data);
};

const deleteItem = function(id) {
  return axios.delete(`${baseUrl}/${id}`);
};

export default { getAll, create, update, deleteItem };

