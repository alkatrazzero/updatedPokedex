import {
  DELETE_FAVORITE_POKEMON, ERROR, FAVORITE_POKEMONS_IS_RENDERED, FETCHING,
  SET_ALL_FAVORITE_POKEMONS, SET_CURRENT_PAGE, SET_CURRENT_POKEMON, SET_CURRENT_TYPE,
  SET_FAVORITE_POKEMON, SET_FAVORITE_POKEMON_FEED, SET_PAGE_SIZE,
  SET_POKEMONS, SET_POKEMONS_URL, SET_RENDER,
  SET_TOTAL_COUNT, SET_TYPES,
} from '../constants';

const initialState = {
  error: null,
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
    case ERROR:
      return { ...state, error: action.message };
    default:
      return state;
  }
};

export default pokemonsReducer;
