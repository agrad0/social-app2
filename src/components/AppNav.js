import { NavLink } from 'react-router-dom';
import './AppNav.css';
import { LoginContext } from '../App';
import React, { createContext, useEffect, useState, useContext } from 'react';
import axios from 'axios';


function AppNav(props) {

  const {loggedIn, setLoggedIn} = useContext(LoginContext);
  

  useEffect(() => {
    if (loggedIn) {
      console.log('zalogowany')
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
              {!loggedIn &&
              <li><NavLink to="/login">Login</NavLink></li>}
              {!loggedIn &&
              <li><NavLink to="/sign-up">Sign up</NavLink></li>}
              {loggedIn &&
              <li><NavLink to="/logout" onClick={props.handleLogout}>Logout</NavLink></li>}
          </ul>
        </nav>
      </>
    );
  }

  export default AppNav;
  