import axios from 'axios';

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
    try {
      const response = await axios.get(`api/pokemons/name?name=${name}&currentPage=${page}&pageSize=${pageSize}`);
      return response.data;
    } catch (e) {
      return e;
    }
  },
  async getPokemonByType(type, page, pageSize) {
    const response = await axios.get(`api/pokemons/type?type=${type}&currentPage=${page}&pageSize=${pageSize}`);
    return response.data;
  },

};
export default pokemonsAPI;
