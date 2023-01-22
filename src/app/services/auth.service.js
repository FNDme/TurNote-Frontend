import axios from "axios";
import * as config from '../config/backend.config.js';

const API_URL = `http://${config.BACKEND_HOST}:8080/api/auth/`;

const register = (username, email, password, name) => {
  return axios.post(API_URL + "signup", {
    username,
    email,
    password,
    name,
  });
}

const login = async (username, password) => {
  return axios.post(API_URL + "signin", {
    username,
    password,
  }).then((response) => {
    if (response.data.username) {
      localStorage.setItem("user", JSON.stringify(response.data));
    }
    return response.data;
  });
}

const logout = () => {
  localStorage.removeItem("user");
  return axios.post(API_URL + "signout").then((response) => {
    return response.data;
  });
}

const removeAccount = () => {
  return axios.delete(API_URL + "removeAccount", { headers: { token: JSON.parse(localStorage.getItem("user")).token } }).then((response) => {
    localStorage.removeItem("user");
    return response.data;
  });
}

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem('user'));;
}

const AuthService = {
  register,
  login,
  logout,
  removeAccount,
  getCurrentUser,
};

export default AuthService;