import axios from 'axios';

export const authAPI = {
  async register(authData) {
    const response = await axios.post('/api/auth/register', authData).catch((error) => error.response);
    console.log(response);
    return response;
  },

  async login(authData) {
    const response = await axios.post('/api/auth/login', authData).catch((error) => error.response);
    return response;
  },
};
