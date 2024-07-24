import axios from 'axios';
import { authService } from './services/authService';


const instance = axios.create({
  baseURL: 'http://dimitry2121.pythonanywhere.com/', 
});


instance.interceptors.request.use(
  (config) => {
    const user = authService.getCurrentUser();
    if (user && user.access) {
      config.headers.Authorization = `Bearer ${user.access}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default instance;