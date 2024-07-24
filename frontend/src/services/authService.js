import axios from 'axios';

const API_URL = 'http://dimitry2121.pythonanywhere.com/api/token/'; 

export const authService = {
  login,
  logout,
  getCurrentUser,
};


function login(username, password) {
  return axios.post(API_URL, { username, password })
    .then((response) => {
      console.log('Ответ от сервера:', response.data); 
      if (response.data.access) {
        localStorage.setItem('user', JSON.stringify(response.data));
      }
      return response.data;
    })
    .catch((error) => {
      console.error('Ошибка при входе:', error); 
      throw error;
    });
}


function logout() {
  localStorage.removeItem('user');
}


function getCurrentUser() {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
}