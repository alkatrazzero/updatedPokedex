import React from 'react';
import Meta from 'antd/es/card/Meta';
import { Card, Tag } from 'antd';
import { POKEMON_CLASSNAMES } from '../../assets/types';
import './pokemons_styles.css';

const PokemonCard = ({ showModal, setNewTargetPokemon, pokemons }) => (
  <div>
    <div className="pokemonsContainer">
      <div className="allPokemons_row">
        {pokemons.map((p) => (
          <div className="pokemonCard_container">
            <Card
              className="pokemonCard"
              onClick={function setTargetPokemon() {
                setNewTargetPokemon(p);
                showModal(p.name);
              }}
              size="default"
              hoverable
              cover={(
                <img
                className="pokemonCard_img"
                alt={`${p.name}`}
                src={p.sprites.other.dream_world.front_default || p.sprites.front_default}
              />
)}
            >
              <div className="pokemonCard_body">
                <Meta
                title={p.name.toUpperCase()}
                description={p.types.map((t) => (
                    <Tag key={t.id} style={{ color: POKEMON_CLASSNAMES[t.type.name] }}>
                      {t.type.name}
                    </Tag>
                  ))}
              />
              </div>
            </Card>
          </div>
        ))}
      </div>
    </div>
  </div>
);
export default PokemonCard;
