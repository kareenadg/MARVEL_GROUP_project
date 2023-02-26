import './MovieDetail.css';

import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import Button from '../ui/Buttons';
const MovieDetail = () => {
  const { id } = useParams();
  const [movies, setMovies] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('https://63ef88eb4d5eb64db0cbc71f.mockapi.io/movies')
      .then((res) => res.json())
      .then((res) => {
        setMovies(res.filter((mov) => mov.id === id));
      });
  }, []);

  return (
    <div className="detailcontainer">
      <button className="back-movies" onClick={() => navigate('/movies')}>
        Back
      </button>
      {movies.map((mov) => (
        <div className="moviecard" key={mov.id}>
          <img src={mov.poster} alt={mov.title} className="movieposter" />

          <div className="movieinfo">
            <h2>{mov.title}</h2>
            <h4>{mov.year}</h4>
            <h4>{mov.phase.toUpperCase()}</h4>
            <h4 className="h4">Cast</h4>
            <figcaption>{mov.cast.join(', ')} </figcaption>
            <h4 className="h4">Synopsis</h4>
            <figcaption className="sypnosis">{mov.synopsis}</figcaption>
            <Button variant="red">
              <a href={mov.trailer} target="_blank" rel="noopener noreferrer">
                Trailer
              </a>
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MovieDetail;
