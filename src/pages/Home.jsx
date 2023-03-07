import './Home.css';

import React from 'react';

import Carousel from '../components/Carousel';
import MovsScroll from '../components/MovsScroll';
import { carouselContent } from '../data/carouselContent';

const Home = () => {
  return (
    <div className="home">
      <Carousel className="images" images={carouselContent} />
      <MovsScroll />
    </div>
  );
};

export default Home;
