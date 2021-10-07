import _ from 'lodash';
import { batch } from 'react-redux';
import { favoritePokemonsAPI, pokemonsAPI } from '../api/api';

const FETCHING = 'FETCHING';
const SET_POKEMONS = 'SET_POKEMONS';
const SET_TOTAL_COUNT = 'SET_TOTAL_COUNT';
const SET_POKEMONS_URL = 'SET_POKEMONS_URL';
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
const SET_TYPES = 'SET_TYPES';
const SET_CURRENT_POKEMON = 'SET_CURRENT_POKEMON';
const SET_CURRENT_TYPE = 'SET_CURRENT_TYPE';
const SET_PAGE_SIZE = 'SET_PAGE_SIZE';
const SET_FAVORITE_POKEMON = 'SET_FAVORITE_POKEMON';
const DELETE_FAVORITE_POKEMON = 'DELETE_FAVORITE_POKEMON';
const SET_ALL_FAVORITE_POKEMONS = 'SET_ALL_FAVORITE_POKEMONS';
const SET_FAVORITE_POKEMON_FEED = 'SET_FAVORITE_POKEMON_FEED';
const initialState = {
  autorized: true,
  pokemons: [],
  pokemonsCount: null,
  pageSize: 56,
  currentPage: 1,
  types: [],
  currentType: null,
  currentPokemon: null,
  favoritePokemons: [],
  favoritePokemonsFeed: [],
  fetching: null,

};
const pokemonsReduser = (state = initialState, action) => {
  switch (action.type) {
    case DELETE_FAVORITE_POKEMON:
      const pokemonToRemove = action.favoritePokemon.name;
      return {
        ...state, favoritePokemons: state.favoritePokemons.filter((p) => p.name !== pokemonToRemove),
      };
    case SET_FAVORITE_POKEMON:
      return {
        ...state, favoritePokemons: state.favoritePokemons.concat([action.favoritePokemon]),
      };
    case SET_ALL_FAVORITE_POKEMONS:
      return {
        ...state, favoritePokemons: action.pokemons,
      };
    case SET_TOTAL_COUNT:
      return {
        ...state,
        pokemonsCount: action.count,
      };
    case SET_POKEMONS:
      return {
        ...state, pokemons: action.pokemons,
      };
    case SET_POKEMONS_URL:
      return {
        ...state, pokemonsURL: action.url,
      };
    case SET_CURRENT_PAGE:
      return { ...state, currentPage: action.page };
    case SET_TYPES:
      return {
        ...state, types: action.pokemonType,
      };
    case SET_CURRENT_TYPE:
      return {
        ...state, currentType: action.currentType,
      };
    case SET_CURRENT_POKEMON:
      return {
        ...state, currentPokemon: action.pokemon,
      };
    case SET_PAGE_SIZE:
      return {
        ...state, pageSize: action.size,
      };
    case SET_FAVORITE_POKEMON_FEED:
      return {
        ...state, favoritePokemonsFeed: state.favoritePokemonsFeed.concat([action.pokemon]),
      };
    case FETCHING:
      return {
        ...state, fetching: action.status,
      };
    default:
      return state;
  }
};
export const fetching = (status) => ({ type: FETCHING, status });
export const currentPageSize = (size) => ({ type: SET_PAGE_SIZE, size });
export const removeOndFavoritePokemon = (favoritePokemon) => ({ type: DELETE_FAVORITE_POKEMON, favoritePokemon });
export const addNewFavoritePokemon = (favoritePokemon) => ({ type: SET_FAVORITE_POKEMON, favoritePokemon });
export const setCurrentType = (currentType) => ({ type: SET_CURRENT_TYPE, currentType });
export const setTypes = (pokemonType) => ({ type: SET_TYPES, pokemonType });
export const setTotalPokemonsCount = (count) => ({ type: SET_TOTAL_COUNT, count });
export const setPokemons = (pokemons) => ({ type: SET_POKEMONS, pokemons });
export const setCurrentPage = (page) => ({ type: SET_CURRENT_PAGE, page });
export const setCurrentPokemon = (pokemon) => ({ type: SET_CURRENT_POKEMON, pokemon });
export const setAllFavoritePokemons = (pokemons) => ({ type: SET_ALL_FAVORITE_POKEMONS, pokemons });
export const setFavoritePokemonsFeed = (pokemon) => ({ type: SET_FAVORITE_POKEMON_FEED, pokemon });

export const setPageSize = (size) => (dispatch) => {
  dispatch(currentPageSize(size));
};
export const getAllFavoritePokemons = (token) => async (dispatch) => {
  dispatch(fetching(true));
  const response = await favoritePokemonsAPI.getFavoritePokemons(token);
  dispatch(fetching(false));

  dispatch(setAllFavoritePokemons(response.data.pokemons));
};
export const addToFavoritePokemon = (favoritePokemon, token) => async (dispatch) => {
  const response = await favoritePokemonsAPI.setFavoritePokemon(favoritePokemon, token);
  dispatch(addNewFavoritePokemon(response.data.favoritePokemon));
};

export const removeFromFavoritePokemon = (favoritePokemon) => async (dispatch) => {
  await favoritePokemonsAPI.removeFavoritePokemon(favoritePokemon._id);
  dispatch(removeOndFavoritePokemon(favoritePokemon));
};
export const getPokemonTypes = () => async (dispatch) => {
  const response = await pokemonsAPI.getPokemonTypes();
  dispatch(setTypes(response.results));
};
export const getCurrentPokemon = (pokemon) => async (dispatch) => {
  const response = await pokemonsAPI.getPokemonByName(pokemon);
  dispatch(setCurrentPokemon(response));
};
export const getPokemons = (page, pageSize) => async (dispatch, getState) => {
  const { currentType } = getState().pokemonsPage;
  if (currentType) {
    const offset = (page - 1) * pageSize;
    dispatch(fetching(true));
    const promiseArray = currentType.map((t) => pokemonsAPI.getPokemon(t));
    const response = await Promise.all(promiseArray);
    const PokemonsArray = response.map((r) => r.pokemon);
    const uniqPokemonsArr = _.uniqBy(_.flatten(PokemonsArray), (p) => p.pokemon.name).slice(offset, offset + pageSize).map((pokemon) => pokemonsAPI.getPokemon(pokemon.pokemon.url));
    const pokemonsArr = await Promise.all(uniqPokemonsArr);
    dispatch(fetching(false));
    dispatch(setTotalPokemonsCount(uniqPokemonsArr.length));
    dispatch(setPokemons(pokemonsArr));
  } else {
    dispatch(fetching(true));
    const pokemons = await pokemonsAPI.getPokemonsFromServer(page, pageSize);
    const { finalRes, count } = pokemons.data;
    batch(() => {
      dispatch(fetching(false));
      dispatch(setPokemons(finalRes));
      dispatch(setTotalPokemonsCount(count));
    });
  }
};

export default pokemonsReduser;
