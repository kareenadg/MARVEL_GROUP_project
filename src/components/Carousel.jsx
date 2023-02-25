import './Carousel.css';

import React, { useEffect } from 'react';
import { useState } from 'react';
const Carousel = ({ images }) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    setTimeout(() => setIndex(index === images.length - 1 ? 0 : index + 1), 8000);
  }, [index]);
  return (
    <section className="carousel-news">
      <div
        className="carousel-wrapper"
        style={{ transform: `translate(${-index * 100}%, 0)` }}
      >
        {images.map((item) => (
          <div key={item.id} className="carousel-card">
            <img src={item.image} alt={item.title} className="card-image" />
            <div className="card-overlay">
              <h2 className="card-title">{item.title}</h2>
              <h3>{item.subtitle}</h3>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Carousel;
