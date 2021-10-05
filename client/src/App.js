import React, {useEffect} from "react"
import UseRoutes from "./routes";
import {useDispatch, useSelector} from "react-redux";
import {setUserData, setUserToken} from "./store/authReduser";
import {getAllFavoritePokemons} from "./store/pokemonsReduser";

const App = (props) => {
  const token=useSelector(state=>state.auth.token)
  const dispatch = useDispatch()
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('userData'))
    const email=JSON.parse(localStorage.getItem('userEmail'))
    if (data) {
      dispatch(setUserToken(data))
      dispatch(setUserData(email))
    }
  }, [])
  useEffect(() => {
    {token && dispatch(getAllFavoritePokemons(token))}
  }, [token])

  return <div>
    <UseRoutes/>
  </div>
}

export default App;