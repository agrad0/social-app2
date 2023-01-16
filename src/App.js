import React from 'react';
import './App.css';

import AppRoutes from './routes/AppRoutes'
import AppNav from './views/AppNav';
import {useState } from 'react';

function App() {


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
