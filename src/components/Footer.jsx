import './Footer.css';

import React from 'react';

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
                <h3>Heroes</h3>
              </li>
              <li>
                <h3>Home</h3>
              </li>
              <li>
                <h3>Login</h3>
              </li>
              <li>
                <h3>Profile</h3>
              </li>
            </ul>
          </section>
        </div>
        <div className="container">
          <span className="lineDivision"></span>
          <div className="underbox">
            <section className="socials">
              <ul>
                <li>
                  <img
                    src="https://res.cloudinary.com/dpidlverd/image/upload/v1677229606/Marvel/iconos/marketing_nagtbo.png"
                    alt="Network icon"
                  />
                </li>
                <li>
                  <img
                    src="https://res.cloudinary.com/dpidlverd/image/upload/v1677229607/Marvel/iconos/facebook_rnnqdo.png"
                    alt="Facebook icon"
                  />
                </li>
                <li>
                  <img
                    src="https://res.cloudinary.com/dpidlverd/image/upload/v1677229606/Marvel/iconos/github_beunqm.png"
                    alt="Github icon"
                  />
                </li>
                <li>
                  <img
                    src="https://res.cloudinary.com/dpidlverd/image/upload/v1677229605/Marvel/iconos/spotify_dbqwu1.png"
                    alt="Spotify icon"
                  />
                </li>
              </ul>
            </section>
            <div className="underText">
              <h3>@Copyright All rights reserved.</h3>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
