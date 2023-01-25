import React, { useEffect } from 'react';
import './App.css';

import AppRoutes from './routes/AppRoutes'
import AppNav from './components/AppNav';
import { useState, createContext } from 'react';
import axios from 'axios';

export const LoginContext = createContext({});

function App() {

  const storagedUser = localStorage.getItem("user");

  const [user, setUser] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect (() => {
    setUser(storagedUser)
  }, [storagedUser])

  const userParsed = JSON.parse(user)

  const handleLogout = (e) => {
    e.preventDefault();
    console.log(userParsed)
    axios.defaults.headers.common["Authorization"] = "Bearer " + (userParsed ? userParsed.jwt_token : "");
    axios.defaults.headers.post["Content-Type"] = "application/json";
    axios.post('https://akademia108.pl/api/social-app/user/logout')
    .then( (response) => {
      console.log(response)
      setLoggedIn(false);
      localStorage.removeItem('user');
      setUser(null);
    })
}

  return (
    <LoginContext.Provider value={{loggedIn, setLoggedIn}}>
    <nav>
      <AppNav user={user} handleLogout={handleLogout}/>
    </nav>
    <div className="App">
      <AppRoutes />
    </div>
    </LoginContext.Provider>
  );
}




export default App;
