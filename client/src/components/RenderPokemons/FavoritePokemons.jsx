import React, { useEffect } from 'react';
import 'antd/dist/antd.css';
import { useDispatch, useSelector } from 'react-redux';
import { pokemonSelector } from '../../store/pokemonsSelector';
import AllPokemons from './AllPokemons';
import { getAllFavoritePokemons, setRenderFavorite } from '../../store/pokemons/pokemonsActions';

const FavoritePokemons = () => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  useEffect(() => {
    dispatch(getAllFavoritePokemons(token));
    dispatch(setRenderFavorite(true));
  },
  []);
  const favoritePokemon = useSelector(pokemonSelector);
  const Pokemons = favoritePokemon;
  return <AllPokemons favoritePokemons={Pokemons} pokemons={favoritePokemon} />;
};
export default React.memo(FavoritePokemons);
