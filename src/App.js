import React, { useEffect } from 'react';
import './App.css';

import AppRoutes from './routes/AppRoutes'
import AppNav from './components/AppNav';
import { useState, createContext } from 'react';
import axios from 'axios';

export const LoginContext = createContext({});


function App() {
  
  const storagedUserData = JSON.parse(localStorage.getItem('userData'));
  
  const [userData, setUserData] = useState(storagedUserData);

  // useEffect (() => {
  //   setUser(storagedUserData);
  // }, [storagedUserData]);
 
  const handleLogout = (e) => {
    e.preventDefault();
    const user = JSON.parse(userData);
    axios.defaults.headers.common["Authorization"] = "Bearer " + (user ? user.jwt_token : "");
    axios.defaults.headers.post["Content-Type"] = "application/json";
    axios.post('https://akademia108.pl/api/social-app/user/logout')
    .then( (response) => {
      console.log(response)
      localStorage.removeItem('userData');
      setUserData(null);
    })
}

  return (
    <LoginContext.Provider value={{userData, setUserData}}>
    <nav>
      <AppNav user={userData} handleLogout={handleLogout}/>
    </nav>
    <div className="App">
      <AppRoutes />
    </div>
    </LoginContext.Provider>
  );
}




export default App;
