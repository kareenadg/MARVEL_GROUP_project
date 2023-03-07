import './Footer.css';

import React from 'react';
import { NavLink } from 'react-router-dom';

const Footer = () => {
  return (
    <div>
      <footer>
        <div className="box">
          <section className="logo">
            <img
              src="https://res.cloudinary.com/dpidlverd/image/upload/v1677238148/Marvel/585f9333cb11b227491c3581_sgwuu2.png"
              alt="Marvel studios logo "
            />
          </section>
          <section className="links">
            <ul>
              <li>
                <NavLink to="/">Home</NavLink>
              </li>
              <li>
                <NavLink to="/movies">Movies</NavLink>
              </li>
              <li>
                <NavLink to="/forum">Forum</NavLink>
              </li>
              <li>
                <NavLink to="/profile">Profile</NavLink>
              </li>
            </ul>
          </section>
        </div>
        <div className="underbox">
          <section className="socials">
            <ul>
              <li>
                <a href="https://www.marvel.com/corporate/advertising">
                  <img
                    src="https://res.cloudinary.com/dpidlverd/image/upload/v1677229606/Marvel/iconos/marketing_nagtbo.png"
                    alt="Network icon"
                  />
                </a>
              </li>
              <li>
                <a href="https://www.facebook.com/Marvel/">
                  <img
                    src="https://res.cloudinary.com/dpidlverd/image/upload/v1677229607/Marvel/iconos/facebook_rnnqdo.png"
                    alt="Facebook icon"
                  />
                </a>
              </li>
              <li>
                <a href="https://github.com/kareenadg/MARVEL_GROUP_project">
                  <img
                    src="https://res.cloudinary.com/dpidlverd/image/upload/v1677229606/Marvel/iconos/github_beunqm.png"
                    alt="Github icon"
                  />
                </a>
              </li>
              <li>
                <a href="https://open.spotify.com/playlist/0mYWUKxLlvP4YDMe8qke84?si=hyQpETY0SEu5cKe4MZASMg">
                  <img
                    src="https://res.cloudinary.com/dpidlverd/image/upload/v1677229605/Marvel/iconos/spotify_dbqwu1.png"
                    alt="Spotify icon"
                  />
                </a>
              </li>
            </ul>
          </section>
          <div className="underText">
            <h3>@Copyright All rights reserved.</h3>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
