import './Home.css';

import React, { useState } from 'react';

import Carousel from '../components/Carousel';
import { carouselContent } from '../data/carouselContent';

const Home = () => {
  return (
    <div className="home">
      <Carousel images={carouselContent} />
    </div>
  );
};

export default Home;
