import './Carousel.css';

import React from 'react';
import { useState } from 'react';
const Carousel = ({ images }) => {
  const [current, setCurrent] = useState(1);
  const nextImage = () => {
    setCurrent(current + 1);
  };

  const prevImage = () => {
    setCurrent(current - 1);
    console.log(current);
  };
  return (
    <section className="carousel-news">
      <div className="carousel-wrapper">
        {images.map((item) => (
          <div key={item.id} className="carousel-card">
            <img src={item.image} alt={item.title} className="card-image" />
            <div className="card-overlay">
              <h2 className="card-title">{item.title}</h2>
              <h3>{item.subtitle}</h3>
            </div>
          </div>
        ))}
        <div className="carousel-buttons">
          <button onClick={() => prevImage()}>
            <img
              src="https://res.cloudinary.com/dnb4ujbgr/image/upload/v1675533027/Pokemons%20icons/arrow_back_chevron_direction_left_navigation_right_icon_123223_yll6zu.png"
              alt="prev icon"
            />
          </button>
          <button onClick={() => nextImage()}>
            <img
              src="https://res.cloudinary.com/dnb4ujbgr/image/upload/v1675533027/Pokemons%20icons/arrows_chevron_direction_left_move_next_right_icon_123222_kogexs.png"
              alt="next icon"
            />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Carousel;
