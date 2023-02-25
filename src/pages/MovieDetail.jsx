import './MovieDetail.css';

import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
const MovieDetail = () => {
  const { id } = useParams();
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetch('https://63ef88eb4d5eb64db0cbc71f.mockapi.io/movies')
      .then((res) => res.json())
      .then((res) => {
        setMovies(res.filter((mov) => mov.id === id));
      });
  }, []);

  return (
    <div className="detailcontainer">
      {movies.map((mov) => (
        <div className="moviecard" key={mov.id}>
          <div className="movieposter">
            <img src={mov.poster} alt={mov.title} />
          </div>
          <div className="movieinfo">
            <h2>{mov.title}</h2>
            <h4>{mov.year}</h4>
            <h4>{mov.phase.toUpperCase()}</h4>
            <h4 className="h4">Cast</h4>
            <figcaption>{mov.cast.join(', ')} </figcaption>
            <h4 className="h4">Synopsis</h4>
            <figcaption>{mov.synopsis}</figcaption>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MovieDetail;
