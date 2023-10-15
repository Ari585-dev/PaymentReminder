import axios from 'axios';

export const checkCredentials = (id, password) => {
  return axios.post('http://192.168.20.21:3000/api/login', {
    id: id,
    password: password,
  })
  .then((response) => {
    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error('Login failed');
    }
  });
};

export const getStudent = (id) => {
  
  return axios.post('http://192.168.20.21:3000/api/getStudent', {
    id: id
  })
  .then((response) => {
    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error('Login failed');
    }
  });
};

export const getDates = () => {
  
  return axios.get('http://192.168.20.21:3000/api/getDates', {

  })
  .then((response) => {
    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error('Login failed');
    }
  });
};

// Add other utility functions here if needed
