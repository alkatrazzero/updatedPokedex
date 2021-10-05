import React, {useState} from "react";
import {useSelector} from "react-redux";
import {ModalWindow} from "../RenderPokemons/ModalWindow";

export const SearchPokemonsModal = () => {

  const [like, setLike] = useState(null)
  const follow = () => setLike(true)
  const unfollow = () => setLike(false)
  const [isModalVisible, setIsModalVisible] = useState(true);
  const targetPokemon = useSelector(state => state.pokemonsPage.currentPokemon)

  return <ModalWindow data={{
    targetPokemon,
    isModalVisible,
    like,
    follow, unfollow, setIsModalVisible
  }}/>

}