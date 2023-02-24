import './Header.css';

import { useContext } from 'react';
import { NavLink } from 'react-router-dom';

import { ThemeFunction } from '../context/themeContext';
import { UserContext } from '../context/userContext';

const Header = () => {
  //login-logout
  const { user, logout } = useContext(UserContext);
  console.log(user);
  //colorthemeChanger
  const { changeTheme } = ThemeFunction();

  return (
    <header className={localStorage.getItem('color') == 'dark' ? 'light' : 'dark'}>
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
        <li>
          <input type="checkbox" className="l" onChange={() => changeTheme()} />
        </li>
      </ul>
    </header>
  );
};

export default Header;
