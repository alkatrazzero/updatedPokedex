import {
  createStore, combineReducers, applyMiddleware, compose,
} from 'redux';
import thunkMiddleware from 'redux-thunk';
import pokemonsReducer from './pokemons/pokemonsReduser';
import { authReduser } from './auth/authReduser';
import { profileReduser } from './profile/profileReduser';

export const reducers = combineReducers({
  pokemonsPage: pokemonsReducer,
  auth: authReduser,
  profilePage: profileReduser,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  reducers,
  composeEnhancers(applyMiddleware(thunkMiddleware)),
);

window.store = store;
export default store;
