import axios from "axios";

const BASE_URL = "http://localhost:5000";

function createHeaders() {

    const auth = JSON.parse(localStorage.getItem("token"));
    const config = {
      headers: {
        Authorization: `Bearer ${auth.token}`
      }
    };
  
    return config;
};

function getUser (id) {
    const config = createHeaders()
    const request = axios.get(`${BASE_URL}/user/${id}`, config);
    return request;
};

function getUsers() {
    const config = createHeaders()
    const request = axios.get(`${BASE_URL}/users`, config);
    return request;
};

function searchUser(query) {
    const config = createHeaders()
    const request = axios.get(`${BASE_URL}/users?keyword=${query}`, config);
    return request;
};

export { createHeaders, getUser, getUsers, searchUser };

  