import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux'; 
import Router from './components/Router.js';
import { UserIdContext } from './components/UserIdContext.js';
import { getUserInfo } from './actions/user.js';
import axios from 'axios'

function App(){
  // Etats
  const [userId, setUserId] = useState(null);
  const dispatch = useDispatch();

  // Comportement
  useEffect(() => {
    const fetchToken = async () => {
      // Récupération du token
      await axios({
        method: "get",
        url: "http://localhost:5000/jwt",
        withCredentials: true
      })
        .then((res) => {
          console.log(res);
          setUserId(res.data);
        })
        .catch((err) => console.log("No token"));
    };
    fetchToken();

    // Si userId dans le store alors on récupère toute les infos de l'utilisateur
    if (userId) {
      dispatch(getUserInfo(userId));
    }
  }, [userId]);

  // Affichage
  return (
    <UserIdContext.Provider value={userId}>
      <Router/>
    </UserIdContext.Provider>
  )
}

export default App;