import axios from 'axios';

// api calls for profileInfo

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

// api calls for autorization
export const authAPI = {
  async register(authData) {
    const response = await axios.post('/api/auth/register', authData).catch((error) => error.response);
    return response;
  },

  async login(authData) {
    const response = await axios.post('/api/auth/login', authData).catch((error) => error.response);
    return response;
  },
};
// api calls for favoritepokemons

export const favoritePokemonsAPI = {
  async getFavoritePokemons(token) {
    const response = await axios.get('api/pokemons/favorites', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  },
  async setFavoritePokemon(pokemonId, token) {
    const response = await axios.post('api/pokemons/add-favorite', { pokemonId }, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  },
  async removeFavoritePokemon(id) {
    const response = await axios.post(`api/pokemons/remove/${id}`, {});
    return response;
  },

};
// api calls for allpokemons

export const pokemonsAPI = {
  async getPokemonsFromServer(currentPage = 1, pageSize = 10) {
    const response = await axios.get(`api/pokemons/all?currentPage=${currentPage}&pageSize=${pageSize}`);
    return response;
  },
  async getPokemonTypes() {
    const response = await axios.get('https://pokeapi.co/api/v2/type');
    return response.data;
  },
  async getPokemonByName(name, page, pageSize) {
    const response = await axios.get(`api/pokemons/name?name=${name}&currentPage=${page}&pageSize=${pageSize}`);
    return response.data;
  },
  async getPokemonByType(type, page, pageSize) {
    const response = await axios.get(`api/pokemons/type?type=${type}&currentPage=${page}&pageSize=${pageSize}`);
    console.log(response);
    return response.data;
  },

};
