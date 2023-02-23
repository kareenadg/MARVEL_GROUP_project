import { createContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
  // const [user, setUser] = useState({
  //   name: '',
  //   password: '',
  // });

  const [user, setUser] = useState(() => {
    const ID = localStorage.getItem('user');
    return ID ? ID : null;
  });

  const [password, setPassword] = useState(() => {
    const ID = localStorage.getItem('password');
    return ID ? ID : null;
  });

  const navigate = useNavigate();

  const login = (user, password) => {
    localStorage.setItem('user', user);
    setUser(user);
    setPassword(password);
    localStorage.setItem('password', password);
    navigate('/profile');
  };

  const logout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('password');
    setUser(null);
    navigate('/');
  };

  return (
    <UserContext.Provider value={{ user, password, login, logout, setUser, setPassword }}>
      {children}
    </UserContext.Provider>
  );
};
