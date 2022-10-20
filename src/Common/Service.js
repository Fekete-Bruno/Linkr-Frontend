import axios from "axios";

// NAO MUDAR PRA NAO TRAVAR O DEPLOY
// COLOCAR NO .env A VARIAVEL ABAIXO PARA TESTES
// REACT_APP_API_BASE_URL=https://localhost:5000
const BASE_URL = process.env.REACT_APP_API_BASE_URL;

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

function postUrls(body){
  const config = createHeaders();
  const request = axios.post(`${BASE_URL}/post`,body,config);
  return request;
}

export { createHeaders, getUser, postUrls };

  