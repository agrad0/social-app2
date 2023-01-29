import { NavLink } from 'react-router-dom';
import './AppNav.css';
import { LoginContext } from '../App';
import React, {  useContext } from 'react';



function AppNav(props) {

  const {userData, setUserData} = useContext(LoginContext);
  

    return (
      <>
        <nav>
          <ul>
              <li><NavLink to="/">Home</NavLink></li>
              {!userData &&
              <li><NavLink to="/login">Login</NavLink></li>}
              {!userData &&
              <li><NavLink to="/sign-up">Sign up</NavLink></li>}
              {userData &&
              <li><NavLink to="/logout" onClick={props.handleLogout}>Logout</NavLink></li>}
          </ul>
        </nav>
      </>
    );
  }

  export default AppNav;
  