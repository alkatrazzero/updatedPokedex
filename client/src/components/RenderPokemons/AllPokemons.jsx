import {POKEMON_CLASSNAMES} from "../../assets/types";
import {Card, Tag} from "antd";
import React, {useEffect, useState} from "react";
import Meta from "antd/es/card/Meta";
import "../RenderPokemons/pokemons_styles.css"
import {ModalWindow} from "./ModalWindow";


const AllPokemons = (props) => {
  useEffect(() => {
    document.title = "Pokemons"
  }, [])

  const [like, setLike] = useState(null)
  const follow = () => setLike(true)
  const unfollow = () => setLike(false)
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [targetPokemon, setNewTargetPokemon] = useState()
  const showModal = (name) => {
    if (props.favoritePokemons.some(e => e.name === name)) {
      follow()
      setIsModalVisible(true);
    } else (
      setIsModalVisible(true),
        unfollow()
    )
  };
  return <div className={"pokemons"}>
    <div className={"pokemonsContainer"}>
      <div className={"allPokemons_row"}>

        {props.pokemons.map((p) => (
          <div className={"pokemonCard_container"}>
            <Card className={"pokemonCard"} onClick={function setTargetPokemon() {
              setNewTargetPokemon(p);
              showModal(p.name)
            }} size={"default"} hoverable
                  cover={<img className={"pokemonCard_img"} alt={`${p.name}`}
                              src={p.sprites.other.dream_world.front_default || p.sprites.front_default}/>}
            >
              <div className={"pokemonCard_body"}>
                <Meta title={p.name.toUpperCase()} description={p.types.map((t) =>
                  <Tag key={t.id} style={{color: POKEMON_CLASSNAMES[t.type.name]}}>
                    {t.type.name}
                  </Tag>
                )}
                />
              </div>
            </Card>
          </div>
        ))}
        <ModalWindow data={{
          targetPokemon,
          isModalVisible,
          like,
          follow, unfollow, setIsModalVisible
        }}/>


      </div>
    </div>
  </div>
}
export default React.memo(AllPokemons)