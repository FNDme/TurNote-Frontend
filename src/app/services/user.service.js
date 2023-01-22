import axios from "axios";
const config = require('../config/backend.config.js');

const API_URL = `http://${config.BACKEND_HOST}:8080/api/test/`;

const getPublicContent = () => {
  return axios.get(API_URL + "all");
}

const getUserBoard = () => {
  return axios.get(API_URL + "user", { headers: { token: JSON.parse(localStorage.getItem("user")).token } });
}

const UserService = {
  getPublicContent,
  getUserBoard,
};

export default UserService;