import axios from "axios";

const apiCall = axios.create({
  baseURL: "https://pokeapi.co/api/v2/",
});
export const profileInfoAPI = {
  updateProfileInfo(dataInfo, token) {
    return axios.post('/api/profile/update', dataInfo, {
      headers: {
        Authorization: 'Bearer ' + token
      }
    }).then((res) => {
      return res.data.profileInfo
    })
  },
  getProfileInfo(token) {
    return axios.get(`api/profile/get`, {
      headers: {
        Authorization: 'Bearer ' + token
      }
    }).then((res) => {
      return res.data.profileInfo
    })
  },
}

//api calls for autorization
export const authAPI = {
  register(authData) {
    return axios.post('/api/auth/register', authData).then(response => {
      return response
    }).catch(function (error) {
      return error.response;
    });
  },
  login(authData) {
    return axios.post('/api/auth/login', authData).catch(function (error) {
      return error.response;
    }).catch(function (error) {
      return error.response;
    });

  }
}
//api calls for render pokemons

export const favoritePokemonsAPI = {
  getFavoritePokemons(token) {
    return axios.get(`api/pokemons`, {
      headers: {
        Authorization: 'Bearer ' + token
      }
    })
  },
  setFavoritePokemon(pokemon, token) {
    return axios.post(`api/pokemons/add`, {pokemon,}, {
      headers: {
        Authorization: 'Bearer ' + token
      }
    })
  },
  removeFavoritePokemon(id) {
    return axios.post(`api/pokemons/remove/${id}`, {})
  },

}
export const pokemonsAPI = {
   getPokemonsFromServer(currentPage = 1, pageSize = 10){
return axios.get(`api/pokemons/all`,{
  headers: {
    currentPage,pageSize
  }
})
   },

  getPokemon(url) {
    return apiCall.get(url).then((response) => {
      return response.data;
    });
  },
  getPokemonTypes() {
    return apiCall.get('type').then((response) => {
      return response.data;
    });
  },
  getPokemonByName(name) {
    return apiCall.get(`pokemon/${name}`).then((response) => {
      return response.data
    })
  },

}
