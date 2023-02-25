import './Carousel.css';

import React from 'react';
import { useState } from 'react';
const Carousel = ({ images }) => {
  const [current, setCurrent] = useState(0);
  return (
    <section className="carousel-news">
      {images.map((item, index) => (
        <div
          key={index}
          className={
            index == current ? 'carousel-card carousel-card-active' : 'carousel-card'
          }
        >
          <img src={item.image} alt={item.title} />
          <div className="card-overlay">
            <h2>{item.title}</h2>
            <h3>{item.subtitle}</h3>
          </div>
        </div>
      ))}
      <div className="carousel-buttons">
        <button>
          <img
            src="https://res.cloudinary.com/dnb4ujbgr/image/upload/v1675533027/Pokemons%20icons/arrow_back_chevron_direction_left_navigation_right_icon_123223_yll6zu.png"
            alt="prev icon"
          />
        </button>
        <button>
          <img
            src="https://res.cloudinary.com/dnb4ujbgr/image/upload/v1675533027/Pokemons%20icons/arrows_chevron_direction_left_move_next_right_icon_123222_kogexs.png"
            alt="next icon"
          />
        </button>
      </div>
    </section>
  );
};

export default Carousel;
