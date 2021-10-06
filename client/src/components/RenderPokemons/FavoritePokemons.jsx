import React, {useEffect} from 'react'
import 'antd/dist/antd.css';
import {useDispatch, useSelector} from "react-redux";
import {pokemonSelector} from "../../store/pokemonsSelector";
import AllPokemons from "./AllPokemons";
import {getAllFavoritePokemons} from "../../store/pokemonsReduser";

 const FavoritePokemons = () => {
   console.log("render")
  const dispatch=useDispatch()
  const token=useSelector(state=>state.auth.token)
  useEffect(() => {
    {
      token && dispatch(getAllFavoritePokemons(token))
    }
  }, [token])
  const favoritePokemon = useSelector(pokemonSelector)
  const Pokemons = favoritePokemon
  return <AllPokemons favoritePokemons={Pokemons} pokemons={favoritePokemon}/>
}
export default FavoritePokemons
