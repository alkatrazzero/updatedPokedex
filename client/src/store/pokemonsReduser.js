import _ from 'lodash';
import { favoritePokemonsAPI, pokemonsAPI } from '../api/api';

const SET_RENDER = 'SET_RENDER';
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
const FAVORITE_POKEMONS_IS_RENDERED = 'FAVORITE_POKEMONS_IS_RENDERED';
const initialState = {
  isFavoriteRendered: false,
  isRendered: false,
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
const pokemonsReducer = (state = initialState, action) => {
  switch (action.type) {
    case DELETE_FAVORITE_POKEMON:
      const pokemonToRemove = action.favoritePokemon;
      return {
        ...state, favoritePokemons: state.favoritePokemons.filter((p) => p._id !== pokemonToRemove),
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
    case SET_RENDER:
      return { ...state, isRendered: action.status };
    case FAVORITE_POKEMONS_IS_RENDERED:
      return { ...state, isFavoriteRendered: action.status };
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
export const setRender = (status) => ({ type: SET_RENDER, status });
export const setRenderFavorite = (status) => ({ type: FAVORITE_POKEMONS_IS_RENDERED, status });

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
  dispatch(addNewFavoritePokemon(response.data.pokemon));
};

export const removeFromFavoritePokemon = (favoritePokemon) => async (dispatch) => {
  await favoritePokemonsAPI.removeFavoritePokemon(favoritePokemon);
  dispatch(removeOndFavoritePokemon(favoritePokemon));
};
export const getPokemonTypes = () => async (dispatch) => {
  const response = await pokemonsAPI.getPokemonTypes();
  dispatch(setTypes(response.results));
};
export const getCurrentPokemon = (pokemon, page, pageSize) => async (dispatch) => {
  const response = await pokemonsAPI.getPokemonByName(pokemon, page, pageSize);
  dispatch(setTotalPokemonsCount(response.totalCount));
  dispatch(setPokemons(response.pokemons));
};
export const getPokemons = (page, pageSize) => async (dispatch, getState) => {
  const { currentType } = getState().pokemonsPage;
  if (currentType) {
    const responseArray = await pokemonsAPI.getPokemonByType(currentType, page, pageSize);
    const uniqPokemonsArr = _.uniqBy(responseArray.pokemons, (p) => p.name);

    dispatch(setTotalPokemonsCount(responseArray.totalCount));// кол-во
    dispatch(setPokemons(uniqPokemonsArr));
  } else {
    dispatch(fetching(true));
    const pokemons = await pokemonsAPI.getPokemonsFromServer(page, pageSize);
    dispatch(fetching(false));
    dispatch(setPokemons(pokemons.data.pokemons));
    dispatch(setTotalPokemonsCount(pokemons.data.totalCount));
  }
};

export default pokemonsReducer;
