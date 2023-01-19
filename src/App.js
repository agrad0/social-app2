import React from 'react';
import './App.css';

import AppRoutes from './routes/AppRoutes'
import AppNav from './components/AppNav';
import {useState } from 'react';
import axios from 'axios';

function App() {

  const [user, setUser] = useState(localStorage.getItem("user"))


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
