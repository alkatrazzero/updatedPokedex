import React, { useEffect, useState } from 'react';
import { Input, Pagination } from 'antd';
import { batch, useDispatch, useSelector } from 'react-redux';
import PokemonTypes from './RenderRokemonTypes/PokemonTypes';
import { pokemonSelector } from '../store/pokemonsSelector';
import { SearchPokemonsModal } from './RenderRokemonTypes/searchPokemons';
import './body.css';
import {
  getCurrentPokemon,
  getPokemons,
  getPokemonTypes,
  setCurrentPage,
  setCurrentType,
  setPageSize,
} from '../store/pokemonsReduser';
import AllPokemons from './RenderPokemons/AllPokemons';
import MemeComponent from './memeComponent';

const { Search } = Input;
const Body = () => {
  const dispatch = useDispatch();
  const pokemonsPage = useSelector((state) => state.pokemonsPage);
  const {
    pageSize,
    currentType,
    currentPage,
    pokemonsCount: totalPokemons,
    pokemons,
    currentPokemon,
    types: pokemonTypes,
  } = pokemonsPage;
  const favoritePokemons = useSelector(pokemonSelector);
  useEffect(() => {
    dispatch(getPokemonTypes());
  }, []);
  useEffect(() => {
    batch(() => {
      dispatch(getPokemons(currentPage, pageSize));
    });
  }, [pageSize, currentPage, currentType]);
  const [valueString, setValue] = useState('');

  const onPageSizeChange = (size) => {
    dispatch(setPageSize(size));
  };
  const onPageChanged = (page) => {
    dispatch(setCurrentPage(page));
  };
  const getPokemonsByType = (typeUrl) => {
    dispatch(setCurrentType(typeUrl));
    dispatch(setCurrentPage(1));
  };
  const onSearch = (value) => {
    if (value) {
      dispatch(getCurrentPokemon(value.toLowerCase()));
      setValue('');
    }
  };
  const onChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <div>
      <div>
        <div>
          <div className="filterSettings">
            <MemeComponent />
            <PokemonTypes getPokemonsByType={getPokemonsByType} pokemonTypes={pokemonTypes} />
            <Search
              className="search_field"
              size="small"
              placeholder="input search text"
              onChange={onChange}
              onSearch={onSearch}
              value={valueString}

            />
          </div>
          {currentPokemon ? <SearchPokemonsModal />
            : (
              <div>
                <AllPokemons favoritePokemons={favoritePokemons} pokemons={pokemons} />
                <Pagination
                  onShowSizeChange={(i, e) => onPageSizeChange(e)}
                  pageSize={pageSize}
                  current={currentPage}
                  onChange={(page) => onPageChanged(page)}
                  defaultCurrent={1}
                  size="small"
                  total={totalPokemons}
                />
              </div>
            )}
        </div>
      </div>
    </div>
  );
};
export default Body;
