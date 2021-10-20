import { Button, Modal, Tag } from 'antd';
import { HeartTwoTone } from '@ant-design/icons';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToFavoritePokemon, removeFromFavoritePokemon, setCurrentPokemon } from '../../store/pokemonsActions/pokemonsActions';
import { POKEMON_CLASSNAMES } from '../../assets/types';

const ModalWindow = (props) => {
  const {
    favoritePokemons,
    targetPokemon,
    isModalVisible,
    setIsModalVisible,
  } = props.data;
  const [like, setLike] = useState(null);
  const follow = () => setLike(true);
  const unfollow = () => setLike(false);

  useEffect(() => {
    if (isModalVisible === true && favoritePokemons.some((e) => e._id === targetPokemon._id)) {
      follow();
    } else {
      unfollow();
    }
  }, [isModalVisible, favoritePokemons]);
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const addToFavoritePokemonDispatch = (favoritePokemon) => (
    dispatch(addToFavoritePokemon(favoritePokemon, token))
  );
  const removeFromFavoritePokemonDispatch = (favoritePokemon) => dispatch((removeFromFavoritePokemon(favoritePokemon)));
  const handleOk = () => {
    unfollow(null);
    dispatch(setCurrentPokemon(null));
    setIsModalVisible(false);
  };
  const handleCancel = () => {
    unfollow(null);
    dispatch(setCurrentPokemon(null));
    setIsModalVisible(false);
  };

  return (
    <div className="modalWindow">
      {targetPokemon
      && (
      <Modal
        width={450}
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <div className="modalContainer">
          <div className="modalWindow_row">
            <div className="modalWindow__info">
              <div>
                <div>{targetPokemon.name}</div>
                {targetPokemon.types.map((t) => (
                  <Tag key={t.id} style={{ color: POKEMON_CLASSNAMES[t.type.name] }}>
                    {t.type.name}
                  </Tag>
                ))}
              </div>
              <div>
                <img
                  className="modalWindow__info_img"

                  src={targetPokemon.sprites.other.dream_world.front_default || targetPokemon.sprites.front_default}
                  alt="f"
                />
              </div>
              <div className="followUnfollow">
                {like ? (
                  <Button
                    onClick={() => {
                      removeFromFavoritePokemonDispatch(targetPokemon._id);
                      unfollow();
                      setIsModalVisible(false);
                    }}

                    icon={<HeartTwoTone twoToneColor="#eb2f96" />}
                  />
                ) : (
                  <Button
                    type="primary"
                    onClick={() => {
                      addToFavoritePokemonDispatch(targetPokemon._id);
                      follow();
                    }}
                  >
                    Follow
                  </Button>
                )}
              </div>
            </div>
            <div className="modalWindow__details">
              <div>
                <div>
                  SKILLS:
                  {targetPokemon.abilities.map((ab) => (
                    <div key={ab.id}>
                      {' '}
                      {ab.ability.name}
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <div>
                  Base experience:
                  {' '}
                  {targetPokemon.base_experience}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal>
      )}
    </div>
  );
};
export default ModalWindow;
