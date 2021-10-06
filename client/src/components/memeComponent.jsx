import React, {useMemo} from "react";
import {useSelector} from "react-redux";
import {Card, Tag} from "antd";
import Meta from "antd/es/card/Meta";
import {POKEMON_CLASSNAMES} from "../assets/types";
//React.memo перерендеривает компонент после получения новых пропсов
const MemeComponent = () => {

  const pokemons=useSelector(state=>state.pokemonsPage.pokemons)
  const computeStrongestPokemon=(pokemons)=> {
    let max = pokemons.length>0&& pokemons.reduce((acc, curr) => acc.weight > curr.weight ? acc : curr)
    return max
  }

  const memoizedValue = useMemo(() => computeStrongestPokemon(pokemons), [pokemons]);

  return<div className={"pokemonCard_container"}>
    Strongest Pokemon
    {memoizedValue&&

        <Card className={"pokemonCard"}
              size={"default"} hoverable
              cover={<img className={"pokemonCard_img"} alt={`${memoizedValue.name}`}
                          src={memoizedValue.sprites.other.dream_world.front_default || memoizedValue.sprites.front_default}/>}
        >
          <div className={"pokemonCard_body"}>
            <Meta title={memoizedValue.name.toUpperCase()} description={memoizedValue.types.map((t) =>
              <Tag key={t.id} style={{color: POKEMON_CLASSNAMES[t.type.name]}}>
                {t.type.name}
              </Tag>
            )}
            />
          </div>
        </Card>}
      </div>

}
export default React.memo(MemeComponent)
