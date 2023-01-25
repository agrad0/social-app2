import { NavLink } from 'react-router-dom';
import './AppNav.css';
import { LoginContext } from '../App';
import React, { createContext, useEffect, useState, useContext } from 'react';


function AppNav() {

  const {loggedIn, setLoggedIn} = useContext(LoginContext);

  useEffect(() => {
    let loggout
    if (loggedIn) {
      console.log('przecież jest zalogowany')
    }
    else {
      console.log('niezalogowany')
    }
  }, [{loggedIn}])
  
    return (
      <>
        <nav>
          <ul>
              <li><NavLink to="/">Home</NavLink></li>
              <li><NavLink to="/login">Login</NavLink></li>
              <li><NavLink to="/sign-up">Sign up</NavLink></li>
          </ul>
        </nav>
      </>
    );
  }

  export default AppNav;
  