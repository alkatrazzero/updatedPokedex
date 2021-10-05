import React from 'react'
import 'antd/dist/antd.css';
import {useSelector} from "react-redux";
import {ComponentCreator} from "../componentCreatoeHelper";
import {pokemonSelector} from "../../store/pokemonsSelector";

export const FavoritePokemons = (props) => {
  const favoritePokemon = useSelector(pokemonSelector)
  const Pokemons = favoritePokemon
  return <ComponentCreator favoritePokemons={Pokemons} pokemons={favoritePokemon}/>
}
