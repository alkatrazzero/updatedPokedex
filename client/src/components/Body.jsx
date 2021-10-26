import React, { useCallback, useEffect, useState } from 'react';
import { Input, Pagination } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import _ from 'lodash';
import PokemonTypes from './RenderRokemonTypes/PokemonTypes';
import { pokemonSelector } from '../store/pokemonsSelector';
import { SearchPokemonsModal } from './RenderRokemonTypes/searchPokemons';
import './body.css';
import {
  getCurrentPokemon,
  getPokemons,
  setCurrentPage,
  setCurrentType,
  setPageSize, setRender,
} from '../store/pokemons/pokemonsActions';
import AllPokemons from './RenderPokemons/AllPokemons';
import MemeComponent from './memeComponent';

const { Search } = Input;
const Body = () => {
  const dispatch = useDispatch();
  const pokemonsPage = useSelector((state) => state.pokemonsPage);
  const {
    error,
    pageSize,
    currentType,
    currentPage,
    pokemonsCount: totalPokemons,
    pokemons,
    currentPokemon,
    types: pokemonTypes,
    isRendered,
  } = pokemonsPage;
  const favoritePokemons = useSelector(pokemonSelector);
  useEffect(() => {
    if (!isRendered) {
      dispatch(getPokemons(currentPage, pageSize));
      dispatch(setRender(true));
    }
  }, [pageSize, currentPage, currentType, isRendered,
  ]);
  const [valueString, setValue] = useState('');

  const onPageSizeChange = (size) => {
    dispatch(setPageSize(size));
    dispatch(setRender(false));
  };
  const onPageChanged = (page) => {
    dispatch(setCurrentPage(page));
    dispatch(setRender(false));
  };
  const getPokemonsByType = (typeUrl) => {
    dispatch(setCurrentType(typeUrl));
    dispatch(setCurrentPage(1));
    dispatch(setRender(false));
  };
  const debouncedOnChange = useCallback(_.debounce((page, size, value) => dispatch(getCurrentPokemon(page, size, value)), 500), []);

  const onChange = (event) => {
    setValue(event.target.value);
    debouncedOnChange(currentPage, pageSize, event.target.value.toLowerCase());
  };

  return (
    <div>
      <div>
        <div>
          <div className="filterSettings">
            {!error && <MemeComponent />}
            <PokemonTypes getPokemonsByType={getPokemonsByType} pokemonTypes={pokemonTypes} />
            <div>
              <Search
                className={error ? 'search_field error' : 'search_field'}
                size="small"
                placeholder="input search text"
                onChange={onChange}
                value={valueString}
              />
            </div>
            <div className="error_message">
              {error}
            </div>
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
