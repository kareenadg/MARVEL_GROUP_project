import './Login.css';

import { useRef, useState } from 'react';
import React, { useContext } from 'react';

import { UserContext } from '../context/userContext';

const Login = () => {
  const { login } = useContext(UserContext);
  const userRef = useRef(null);
  const passRef = useRef(null);
  const [error, setError] = useState(null);
  const handleSubmit = (user, password) => {
    const regex = /[A-Z]|[0-9]/gm;
    password == '' || user == ''
      ? setError('Please, fill out all required fields')
      : password.length < 6 || !password.match(regex)
      ? setError(
          'Your password must be at least 6 characters and must have at least one capital letter and one number',
        )
      : login(user, password);
  };

  return (
    <div className="container">
      <div className="inputBow">
        <input
          ref={userRef}
          type="text"
          placeholder="enter your name"
          name="name"
          id="name"
        />

        <input
          ref={passRef}
          type="password"
          placeholder="*******"
          name="password"
          id="password"
        />
      </div>

      <div className="button">
        <button
          type="submit"
          onClick={() => handleSubmit(userRef.current.value, passRef.current.value)}
        >
          login
        </button>
        {error && <h2>{error}</h2>}
      </div>
    </div>
  );
};

export default Login;
