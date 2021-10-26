import axios from 'axios';

// index.js
// re -export
// api calls for profileInfo

// api calls for autorization

// api calls for favoritepokemons

// api calls for allpokemons
// ,authAPI,favoritePokemonsAPI,profileInfoAPI
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
export const pokemonsAPI = {
  async getPokemonsFromServer(currentPage = 1, pageSize = 10, name = '') {
    const response = await axios.get(`api/pokemons/all?currentPage=${currentPage}&pageSize=${pageSize}&name=${name}`);
    return response.data;
  },
  async getPokemonTypes() {
    const response = await axios.get('https://pokeapi.co/api/v2/type');
    return response.data;
  },
  // async getPokemonByName(name, page, pageSize) {
  //   try {
  //     const response = await axios.get(`api/pokemons/name?name=${name}&currentPage=${page}&pageSize=${pageSize}`);
  //     return response.data;
  //   } catch (e) {
  //     return e;
  //   }
  // },
  async getPokemonByType(type, page, pageSize) {
    const response = await axios.get(`api/pokemons/type?type=${type}&currentPage=${page}&pageSize=${pageSize}`);
    return response.data;
  },

};
