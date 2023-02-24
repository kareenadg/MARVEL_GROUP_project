import { createContext, useContext, useEffect, useState } from 'react';

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [color, setColor] = useState('dark');

  const changeTheme = () => {
    if (color === 'dark') {
      setColor('light');
      localStorage.setItem('color', 'light');
    } else {
      setColor('dark');
      localStorage.setItem('color', 'dark');
    }
  };
  useEffect(() => {
    localStorage.getItem('user') && setColor(localStorage.getItem('color'));
    document.body.className = color;
  }, [color]);

  return (
    <ThemeContext.Provider value={{ changeTheme }}>{children}</ThemeContext.Provider>
  );
};
export const ThemeFunction = () => {
  return useContext(ThemeContext);
};
