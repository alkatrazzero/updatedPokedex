import axios from 'axios';

export const profileInfoAPI = {
  async updateProfileInfo(dataInfo, token) {
    const response = await axios.post('/api/profile/update', dataInfo, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.profileInfo;
  },
  async getProfileInfo(token) {
    const response = await axios.get('api/profile', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.profileInfo;
  },
};
