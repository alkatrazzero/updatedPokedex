import axios from 'axios';

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
