import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import AppLayout from './AppLayout';
import { setUserData, setUserToken } from './store/auth/authActions';
import { getPokemonTypes } from './store/pokemons/pokemonsActions';

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getPokemonTypes());
    const data = JSON.parse(localStorage.getItem('userData'));
    const email = JSON.parse(localStorage.getItem('userEmail'));
    if (data) {
      dispatch(setUserToken(data));
      dispatch(setUserData(email));
    }
  }, []);
  return (
    <div>
      <AppLayout />
    </div>
  );
};

export default React.memo(App);
