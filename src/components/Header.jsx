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
        <li className="pages">
          <NavLink to="/">Home</NavLink>
        </li>
        {user && (
          <li className="pages">
            <NavLink to="/movies">Movies</NavLink>
          </li>
        )}
        {user && (
          <li className="pages">
            <NavLink to="/forum">Forum</NavLink>
          </li>
        )}
        {user && (
          <li className="pages">
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
            <button className="logoutbtn" onClick={() => logout()}>
              <img
                src="https://res.cloudinary.com/do7bnejaz/image/upload/v1677274492/Icons/off-button_zqckbm.png"
                alt="logout icon"
              />
            </button>
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
