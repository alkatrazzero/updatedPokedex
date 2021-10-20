import React from 'react';
import { useSelector } from 'react-redux';
import AllPokemons from '../RenderPokemons/AllPokemons';

export const SearchPokemonsModal = () => {
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
