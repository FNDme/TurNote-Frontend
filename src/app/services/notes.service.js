import axios from "axios";
import * as config from '../config/backend.config.js';

const API_URL = `http://${config.BACKEND_HOST}:8080/api/notes/`;

const publish = (title, content, tags, isPublic) => {
  return axios.post(API_URL, {
    title,
    content,
    tags,
    isPublic,
  }, { headers: { token: JSON.parse(localStorage.getItem("user")).token } });
}

const get = (id) => {
  return axios.get(API_URL + id, { headers: { token: JSON.parse(localStorage.getItem("user"))?.token } });
}

const getPublic = (id) => {
  return axios.get(API_URL + 'public/' + id);
}

const update = (id, title, content, tags, isPublic) => {
  return axios.put(API_URL + id, {
    title,
    content,
    tags,
    isPublic,
  }, { headers: { token: JSON.parse(localStorage.getItem("user")).token } });
}

const remove = (id) => {
  return axios.delete(API_URL + id, { headers: { token: JSON.parse(localStorage.getItem("user")).token } });
}

const NotesService = {
  publish,
  get,
  getPublic,
  update,
  remove,
};

export default NotesService;