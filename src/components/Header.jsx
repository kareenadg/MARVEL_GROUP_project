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
    <header>
      <span className="logo_header">
        <img
          src="https://res.cloudinary.com/dpidlverd/image/upload/v1677238148/Marvel/585f9333cb11b227491c3581_sgwuu2.png"
          alt="Marvel logo"
        />
      </span>
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
