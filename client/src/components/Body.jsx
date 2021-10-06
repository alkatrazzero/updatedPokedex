import React, {useEffect, useState} from 'react'
import {Pagination} from "antd";
import {Input} from 'antd';
import PokemonTypes from "./RenderRokemonTypes/PokemonTypes";
import {ComponentCreator} from "./componentCreatoeHelper";
import {useDispatch, useSelector} from "react-redux";
import {pokemonSelector} from "../store/pokemonsSelector";
import {SearchPokemonsModal} from "./RenderRokemonTypes/searchPokemons";
import {
  getCurrentPokemon,
  getPokemons,
  getPokemonTypes,
  setCurrentPage,
  setCurrentType,
  setPageSize
} from "../store/pokemonsReduser";

const Body = (props) => {
  const pageSize = useSelector(state => state.pokemonsPage.pageSize)
  const currentType = useSelector(state => state.pokemonsPage.currentType)
  const currentPage = useSelector(state => state.pokemonsPage.currentPage)
  useEffect(() => {
    dispatch(getPokemonTypes())
    dispatch(getPokemons(currentPage, pageSize))
  }, [pageSize, currentPage, currentType])

  const totalPokemons= useSelector(state=>state.pokemonsPage.pokemonsCount)
  const pokemons=useSelector(state=>state.pokemonsPage.pokemons)
  const currentPokemon=useSelector(state=>state.pokemonsPage.currentPokemon)
  const pokemonTypes=useSelector(state=>state.pokemonsPage.types)

  const dispatch = useDispatch()

  const onPageSizeChange = (size) => {
    dispatch(setPageSize(size))
  }
  const onPageChanged = (page) => {
    dispatch(setCurrentPage(page))
  };
  const getPokemonsByType = (typeUrl) => {
  dispatch(setCurrentType(typeUrl))
    dispatch(setCurrentPage(1))
  }

  const favoritePokemons = useSelector(pokemonSelector)
  const {Search} = Input;
  const [valueString, setValue] = useState('')

  const onSearch = (value) => {
    if (value) {
      {
        dispatch(getCurrentPokemon(value.toLowerCase()))
        setValue('')
      }
    }
  }
  const onChange = (event) => {
    setValue(event.target.value)
  }

  return <div>
    <div>
      <div>
        <div className={"filterSettings"}>
          <PokemonTypes getPokemonsByType={getPokemonsByType} pokemonTypes={pokemonTypes}/>
          <Search size={"small"} placeholder={"input search text"} onChange={onChange} onSearch={onSearch}
                  value={valueString}
                  style={{width: 200}}/>
        </div>

        {currentPokemon ? <SearchPokemonsModal/> :
          <div>
            <ComponentCreator favoritePokemons={favoritePokemons} pokemons={pokemons}/>
            <Pagination style={{marginTop: 20}} onShowSizeChange={(i, e) => onPageSizeChange(e)}
                        pageSize={pageSize}
                        current={currentPage} onChange={(page) => onPageChanged(page)}
                        defaultCurrent={1} size={"small"}
                        total={totalPokemons}/>
          </div>

        }
      </div>
    </div>
  </div>
}
export default React.memo(Body);
