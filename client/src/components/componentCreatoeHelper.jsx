import React from "react";
import AllPokemons from "./RenderPokemons/AllPokemons";

export const ComponentCreator = (props) => {
    return <AllPokemons serach={true} pokemons={props.pokemons} favoritePokemons={props.favoritePokemons}/>


}
