import { Redirect, Route, Switch } from 'react-router-dom';
import React from 'react';
import FavoritePokemons from './components/RenderPokemons/FavoritePokemons';
import Profile from './components/profile/profile';
import Body from './components/Body';

const Routes = () => (
  <Switch>
    <Route exact path="/Favorite-pokemons">
      <FavoritePokemons />
    </Route>
    <Route path="/Profile:id" render={() => <Profile />} />
    <Route exact path="/Pokemons" render={() => <Body />} />
    <Redirect to="/Favorite-pokemons" />
  </Switch>
);
export default Routes;
