import React, { useState } from 'react';
import './renderTypes.css';
import { TreeSelect } from 'antd';

const PokemonTypes = (props) => {
  const treeData = [];
  {
    props.pokemonTypes.map((type) => treeData.push({ title: type.name, value: type.name, key: type.name }));
  }
  const { SHOW_PARENT } = TreeSelect;
  const [stateValue, setStateValue] = useState([]);
  const onChange = (value) => {
    setStateValue(value);
    {
      value.length > 0 ? props.getPokemonsByType(value) : props.getPokemonsByType(null);
    }
  };
  const tProps = {
    treeData,
    value: stateValue,
    onChange,
    treeCheckable: true,
    showCheckedStrategy: SHOW_PARENT,
    placeholder: 'Please select type',
    style: {
      width: '100%',
    },
  };
  return (
    <div>
      <div className="TreeSelectTypes">
        <TreeSelect style={{ width: '100%' }} size="small" {...tProps} />
      </div>
    </div>
  );
};
export default PokemonTypes;
