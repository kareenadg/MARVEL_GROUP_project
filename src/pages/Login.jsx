import './Login.css';

import { useRef, useState } from 'react';
import React, { useContext } from 'react';

import { UserContext } from '../context/userContext';
import Avatar from '../ui/avatar';

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
    <div className="login-container">
      <section className="box">
        {/* <Avatar
          image="https://res.cloudinary.com/ddu2qdsdp/image/upload/v1677237031/Marvel/photo-1438761681033-6461ffad8d80_cuvfkr.jpg"
          size="lg"
        /> */}
        <div className="inputBox">
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

        <div className="div-btn">
          <button
            type="submit"
            onClick={() => handleSubmit(userRef.current.value, passRef.current.value)}
          >
            login
          </button>
          {error && <h2>{error}</h2>}
        </div>
      </section>
    </div>
  );
};

export default Login;
