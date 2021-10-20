import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import ModalWindow from '../RenderPokemons/ModalWindow';
import AllPokemons from '../RenderPokemons/AllPokemons';

export const SearchPokemonsModal = () => {
  const [like, setLike] = useState(null);
  const follow = () => setLike(true);
  const unfollow = () => setLike(false);
  const [isModalVisible, setIsModalVisible] = useState(true);
  const { currentPokemon: targetPokemon, favoritePokemons } = useSelector((state) => state.pokemonsPage);

  return (
    <AllPokemons favoritePokemons={favoritePokemons} pokemons={[targetPokemon]} />
    // <ModalWindow data={{
    //   favoritePokemons,
    //   targetPokemon,
    //   isModalVisible,
    //   like,
    //   follow,
    //   unfollow,
    //   setIsModalVisible,
    // }}
    // />
  );
};
