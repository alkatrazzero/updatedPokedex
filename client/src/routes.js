import {Redirect, Route, Switch} from "react-router-dom";
import FavoritePokemons from "./components/RenderPokemons/FavoritePokemons";
import Profile from "./components/profile/profile";
import Body from "./components/Body";
import {TierListPokemons} from "./components/tierListPokemons/tierList";
import React from "react";

const Routes = () => {

  return <Switch>
    <Route exact path={"/Favorite-pokemons"}>
      <FavoritePokemons/>
    </Route>
    <Route exact path={"/Profile"} render={() => <Profile/>}/>
    <Route exact path={"/Pokemons"} render={() => <Body/>}/>
    <Route exact path={"/Pokemons-tier-list"} render={() => <TierListPokemons/>}/>
    <Redirect to={"/Favorite-pokemons"}/>
  </Switch>

}
export default Routes;
