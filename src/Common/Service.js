import axios from "axios";

// NAO MUDAR PRA NAO TRAVAR O DEPLOY
// COLOCAR NO .env A VARIAVEL ABAIXO PARA TESTES
// REACT_APP_API_BASE_URL=https://localhost:5000
const BASE_URL = process.env.REACT_APP_API_BASE_URL;

function createHeaders() {
  const auth = JSON.parse(localStorage.getItem("token"));
  const config = {
    headers: {
      Authorization: `Bearer ${auth.token}`,
    },
  };
  return config;
}

function getUser(id) {
  const config = createHeaders();
  const request = axios.get(`${BASE_URL}/user/${id}`, config);
  return request;
}

function getUsers() {
  const config = createHeaders();
  const request = axios.get(`${BASE_URL}/users`, config);
  return request;
}

function searchUser(query) {
  const config = createHeaders();
  const request = axios.get(`${BASE_URL}/users?keyword=${query}`, config);
  return request;
}

function postUrls(body) {
  const config = createHeaders();
  const request = axios.post(`${BASE_URL}/post`, body, config);
  return request;
}

function getPosts() {
  const config = createHeaders();
  const request = axios.get(`${BASE_URL}/timeline`, config);
  return request;
}

function editPost(id, body) {
  const config = createHeaders();
  const request = axios.put(`${BASE_URL}/posts/${id}`, body, config);
  return request;
}

function deletePost(id) {
  const config = createHeaders();
  const request = axios.delete(`${BASE_URL}/posts/${id}`, config);
  return request;
}

function postLikes(body){
  const config = createHeaders();
  const request = axios.post(`${BASE_URL}/like`,body,config);
  return request;
}

export {
  createHeaders,
  getUser,
  getUsers,
  searchUser,
  postUrls,
  getPosts,
  editPost,
  deletePost,
  postLikes,
};
