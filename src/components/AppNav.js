import { NavLink } from 'react-router-dom';
import './AppNav.css'


function AppNav() {
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
  