import axios from 'axios';
import { API_BASE_URL } from '../constants';

const api = (headers = {}) => {
  const instance = axios.create({
    baseURL: API_BASE_URL,
    // headers
    headers: { ...headers }
  })

  instance.interceptors.response.use(
    response => {
      return response.data;
    },
    (error) => {
      return Promise.reject(error);
    }
  )

  return instance;
}

export default api;