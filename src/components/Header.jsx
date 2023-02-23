import './Header.css';

import { useContext } from 'react';
import { NavLink } from 'react-router-dom';

import { UserContext } from '../context/userContext';

const Header = () => {
  const { user, logout } = useContext(UserContext);
  console.log(user);
  return (
    <header>
      <ul>
        <li>
          <NavLink to="/">Home</NavLink>
        </li>
        {user && (
          <li>
            <NavLink to="/movies">Movies</NavLink>
          </li>
        )}
        {user && (
          <li>
            <NavLink to="/heroes">Heroes</NavLink>
          </li>
        )}
        {user && (
          <li>
            {' '}
            <NavLink to="/profile">Profile</NavLink>
          </li>
        )}
        {!user && (
          <li>
            <NavLink to="/login">Login</NavLink>
          </li>
        )}
        {user && (
          <li>
            <button onClick={() => logout()}>Logout</button>
          </li>
        )}
      </ul>
    </header>
  );
};

export default Header;
