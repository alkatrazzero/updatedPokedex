import React, { useEffect, useState } from 'react';
import './pokemons_styles.css';
import { useSelector } from 'react-redux';
import ModalWindow from './ModalWindow';
import PokemonCard from './pokemonCard';
import { Preloader } from '../../assets/Preloader';

const AllPokemons = ({ favoritePokemons, pokemons }) => {
  const fetching = useSelector((state) => state.pokemonsPage.fetching);
  useEffect(() => {
    document.title = 'Pokemons';
  }, []);
  const [like, setLike] = useState(null);
  const follow = () => setLike(true);
  const unfollow = () => setLike(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [targetPokemon, setNewTargetPokemon] = useState();
  const showModal = (name) => {
    if (favoritePokemons.some((e) => e.name === name)) {
      follow();
      setIsModalVisible(true);
    } else {
      (
        setIsModalVisible(true),
        unfollow()
      );
    }
  };
  return (
    <div className="pokemons">
      {!fetching ? (
        <div>
          <PokemonCard setNewTargetPokemon={setNewTargetPokemon} pokemons={pokemons} showModal={showModal} />
          <ModalWindow data={{
            targetPokemon,
            isModalVisible,
            like,
            follow,
            unfollow,
            setIsModalVisible,
          }}
          />
        </div>
      ) : <div className="preloader"><Preloader /></div>}
    </div>
  );
};
export default AllPokemons;
