import React from 'react';
import './App.css';

import AppRoutes from './routes/AppRoutes'
import AppNav from './components/AppNav';
import {useState } from 'react';
import axios from 'axios';

function App() {

  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")))

  axios.defaults.headers.common["Authorization"] = "Bearer " + (user ? user.jwt_token : "");
  axios.defaults.headers.post["Content-Type"] = "application/json"


  return (
    <>
    <nav>
      <AppNav />
    </nav>
    <div className="App">
      <AppRoutes />
    </div>
    </>
  );
}




export default App;
