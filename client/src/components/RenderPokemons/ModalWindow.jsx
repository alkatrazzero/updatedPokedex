import {Button, Modal, Tag} from "antd";
import {POKEMON_CLASSNAMES} from "../../assets/types";
import {HeartTwoTone} from "@ant-design/icons";
import React from "react";
import {addToFavoritePokemon, removeFromFavoritePokemon, setCurrentPokemon} from "../../store/pokemonsReduser";
import {useDispatch, useSelector} from "react-redux";


export const ModalWindow = (props) => {
  const {
    targetPokemon,
    isModalVisible,
    like,
    follow, unfollow, setIsModalVisible
  } = props.data
  const dispatch = useDispatch()
  const token = useSelector(state => state.auth.token)
  const addToFavoritePokemonDispatch = (favoritePokemon) => {
    return (
      dispatch(addToFavoritePokemon(favoritePokemon, token))
    )
  }
  const removeFromFavoritePokemonDispatch = (favoritePokemon) => dispatch((removeFromFavoritePokemon(favoritePokemon)))
  const handleOk = () => {
    unfollow(null)
    dispatch(setCurrentPokemon(null))
    setIsModalVisible(false);
  };
  const handleCancel = () => {
    unfollow(null)
    dispatch(setCurrentPokemon(null))
    setIsModalVisible(false);
  };

  return <div className={"modalWindow"}>
    {targetPokemon &&
      <Modal width={450} visible={isModalVisible} onOk={handleOk}
             onCancel={handleCancel}>
        <div className={"modalContainer"}>
          <div className={"modalWindow_row"}>
            <div className={"modalWindow__info"}>
              <div>
                <div>{targetPokemon.name}</div>
                {targetPokemon.types.map((t) =>
                  <Tag key={t.id} style={{color: POKEMON_CLASSNAMES[t.type.name]}}>
                    {t.type.name}</Tag>)}</div>
              <div className={"modalWindow__info_img"}>
                <img style={{width: 150, height: 150}}
                     src={targetPokemon.sprites.other.dream_world.front_default || targetPokemon.sprites.front_default}/>
              </div>
              <div className={"followUnfollow"}>
                {like ? <Button onClick={
                    function remove() {
                      removeFromFavoritePokemonDispatch(targetPokemon)
                      unfollow()
                      setIsModalVisible(false)

                    }} icon={<HeartTwoTone twoToneColor="#eb2f96"/>}/> :
                  <Button type="primary" onClick={function add() {
                    addToFavoritePokemonDispatch(targetPokemon)
                    follow()
                  }}>
                    Follow </Button>}
              </div>
            </div>
            <div className={"modalWindow__details"}>
              <div>
                <div>SKILLS:{targetPokemon.abilities.map((ab) =>
                  <div key={ab.id}> {ab.ability.name}</div>
                )}</div>
              </div>
              <div>
                <div>
                  Base experience: {targetPokemon.base_experience}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal>}
  </div>

}
