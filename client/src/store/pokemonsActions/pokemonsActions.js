import _ from 'lodash';
import {
  DELETE_FAVORITE_POKEMON, FAVORITE_POKEMONS_IS_RENDERED,
  FETCHING, SET_ALL_FAVORITE_POKEMONS, SET_CURRENT_PAGE, SET_CURRENT_POKEMON,
  SET_CURRENT_TYPE,
  SET_FAVORITE_POKEMON, SET_FAVORITE_POKEMON_FEED,
  SET_PAGE_SIZE, SET_POKEMONS, SET_RENDER, SET_TOTAL_COUNT,
  SET_TYPES,
} from '../constants';
import { favoritePokemonsAPI, pokemonsAPI } from '../../api/api';

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
