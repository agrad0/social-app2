import React, { useEffect } from 'react';
import './App.css';

import AppRoutes from './routes/AppRoutes'
import AppNav from './components/AppNav';
import { useState, createContext } from 'react';
import axios from 'axios';

export const LoginContext = createContext({});

function App() {

  const [user, setUser] = useState(localStorage.getItem("user"));
  const [loggedIn, setLoggedIn] = useState(false);


  return (
    <LoginContext.Provider value={{loggedIn, setLoggedIn}}>
    <nav>
      <AppNav />
    </nav>
    <div className="App">
      <AppRoutes />
    </div>
    </LoginContext.Provider>
  );
}




export default App;
