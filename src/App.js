import React, { useEffect } from 'react';
import './App.css';

import AppRoutes from './routes/AppRoutes'
import AppNav from './components/AppNav';
import { useState, createContext } from 'react';
import axios from 'axios';
export const LoginContext = createContext({});


const App = () => {

  
  const storagedUserData = localStorage.getItem('user-item');
  const [userData, setUserData] = useState(storagedUserData);

  const axiosHeader = axios.defaults.headers.common["Authorization"] = "Bearer " + (userData ? JSON.parse(userData).jwt_token : "");
  const axiosDefaults = axios.defaults.headers.post["Content-Type"] = "application/json";
 
  const handleLogout = (e) => {
    console.log(JSON.parse(userData))
    e.preventDefault();
    axios.post('https://akademia108.pl/api/social-app/user/logout')
    .then( (response) => {
      localStorage.removeItem('user-item');
      setUserData(null);
    })
}

  return (
    <LoginContext.Provider value={{userData, setUserData, axiosHeader, axiosDefaults}}>
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
