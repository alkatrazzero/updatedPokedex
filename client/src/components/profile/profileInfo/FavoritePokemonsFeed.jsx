import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { uniqFavoritePokemonsFeed } from '../../../store/pokemonsSelector';
import { getRandomArrayElements } from '../../../assets/rundomValueFavoritePokemonsArr';
import { setFavoritePokemonsFeed } from '../../../store/pokemonsActions/pokemonsActions';

const FavoritePokemonsFeed = () => {
  const dispatch = useDispatch();
  const favoritePokemon = useSelector((state) => state.pokemonsPage.favoritePokemons);
  const favoritePokemonsFeed = useSelector(uniqFavoritePokemonsFeed);
  const [randomPokemons, setRandomPokemons] = useState([]);
  const lastFavoritePokemons = favoritePokemon[favoritePokemon.length - 1];
  useEffect(() => {
    if (lastFavoritePokemons) {
      dispatch(setFavoritePokemonsFeed(lastFavoritePokemons));
    }
  }, [lastFavoritePokemons]);
  useEffect(() => {
    setRandomPokemons(getRandomArrayElements(favoritePokemon, 6));
  }, [favoritePokemon]);
  return (
    <div className="favoritePokemons">
      <div className="favoritePokemonsCotainer">
        <div className="favoritePokemons__row">
          <div className="top6favoritePokemons">
            Favorite Pokemons
            {randomPokemons.length > 5 ? randomPokemons.map((p) => (
              <div>
                <img
                  className="top6favoritePokemons__image"
                  src={p.sprites.other.dream_world.front_default || p.sprites.front_default}
                  alt="f"
                />
              </div>
            )) : null}
          </div>
          <div className="pokemonsfeed">
            {favoritePokemonsFeed.map((p) => (
              <div>
                Последний добавленный в избранные покемон:
                {p && p.name}
                <img
                  className="top6favoritePokemons__image"
                  src={p ? p.sprites.other.dream_world.front_default
                    || p.sprites.front_default : null}
                  alt="f"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
export default FavoritePokemonsFeed;
