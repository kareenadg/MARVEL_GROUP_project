import './Login.css';

import { useRef, useState } from 'react';
import React, { useContext } from 'react';

import { UserContext } from '../context/userContext';
import Spinner from '../ui/Spinner';

function Login() {
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
    <div className="login-page">
      <section className="video">
        <video loop muted autoPlay>
          <source
            src="https://res.cloudinary.com/dpidlverd/video/upload/v1677325985/Marvel/Marvelintrocorto_fssr28.mp4"
            type="video/mp4"
          />
        </video>
        <div className="login-container">
          <section className="box2">
            <div className="logoMarvel">
              <img
                src="https://res.cloudinary.com/dpidlverd/image/upload/v1677321992/Marvel/4Rsjob3_hn3ftv.png"
                alt="marvel logo"
              ></img>
            </div>
            <div className="emojInp">
              <div className="emoji">
                <img
                  src="https://res.cloudinary.com/dpidlverd/image/upload/v1677272005/replica/user_fqboi2.png"
                  alt="user emoji"
                ></img>
              </div>
              <input
                className="loginInp"
                ref={userRef}
                type="text"
                placeholder="enter your name"
                name="name"
                id="name"
              />
            </div>
            <div className="emojInp2">
              <div className="emoji2">
                <img
                  src="https://res.cloudinary.com/dpidlverd/image/upload/v1677273838/replica/padlock_phq9rq.png"
                  alt="lock emoji"
                ></img>
              </div>
              <input
                className="loginInp"
                ref={passRef}
                type="password"
                placeholder="*******"
                name="password"
                id="password"
              />
            </div>
            <button
              className="btn"
              type="submit"
              onClick={() => handleSubmit(userRef.current.value, passRef.current.value)}
            >
              login
            </button>
            {error && <h2>{error}</h2>}
          </section>
        </div>
      </section>
    </div>
  );
}

export default Login;
