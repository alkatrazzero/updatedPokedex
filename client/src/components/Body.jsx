import React, {useEffect, useState} from 'react'
import {Input, Pagination} from "antd";
import PokemonTypes from "./RenderRokemonTypes/PokemonTypes";
import {batch, useDispatch, useSelector} from "react-redux";
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
import AllPokemons from "./RenderPokemons/AllPokemons";
import MemeComponent from "./memeComponent";

const {Search} = Input;
const Body = (props) => {
  const pokemonsPage = useSelector(state => state.pokemonsPage)
  const {
    pageSize,
    currentType,
    currentPage,
    pokemonsCount: totalPokemons,
    pokemons,
    currentPokemon,
    types: pokemonTypes
  } = pokemonsPage
  const favoritePokemons = useSelector(pokemonSelector)
  useEffect(()=>{
    dispatch(getPokemonTypes())
  },[])
  useEffect(() => {
    batch(() => {
      dispatch(getPokemons(currentPage, pageSize))
    })

  }, [pageSize, currentPage, currentType])
  const dispatch = useDispatch()
  const [valueString, setValue] = useState('')

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
          <MemeComponent/>
          <PokemonTypes getPokemonsByType={getPokemonsByType} pokemonTypes={pokemonTypes}/>
          <Search size={"small"} placeholder={"input search text"} onChange={onChange} onSearch={onSearch}
                  value={valueString}
                  style={{width: 200}}/>
        </div>
        {currentPokemon ? <SearchPokemonsModal/> :
          <div>
            <AllPokemons favoritePokemons={favoritePokemons} pokemons={pokemons}/>
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
export default Body
