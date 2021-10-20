import React, { useEffect, useState } from 'react';
import { Input, Pagination } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
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
  const onChange = (event) => {
    setValue(event.target.value);
    dispatch(getCurrentPokemon(event.target.value.toLowerCase(), currentPage, pageSize));
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
