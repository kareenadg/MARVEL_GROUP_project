import './Movies.css';

import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const phases = ['Phase 1', 'Phase 2', 'Phase 3', 'Phase 4', 'Phase 5'];

  useEffect(() => {
    fetch('https://63ef88eb4d5eb64db0cbc71f.mockapi.io/movies')
      .then((res) => res.json())
      .then((res) => {
        setMovies(res);
        setFilteredMovies(res);
      });
  }, []);

  const filterMov = (keyword) => {
    const filter = movies.filter((mov) =>
      mov.title.toLowerCase().includes(keyword.toLowerCase()),
    );
    setFilteredMovies(filter);
  };

  return (
    <div className="movies">
      <input
        type="text"
        placeholder="search..."
        onChange={(ev) => filterMov(ev.target.value)}
      />
      <div className="filters">
        <button onClick={() => setFilteredMovies(movies)}>ALL</button>
        <select id="phases">
          <option value="-">-</option>
          {phases.map((phase) => (
            <option value={phase}>{phase}</option>
          ))}
        </select>
        <div className="movies-container">
          {filteredMovies.map((mov) => (
            <figure key={mov.id}>
              <img
                src={mov.poster}
                alt={mov.title}
                onClick={() => <Link to={`/movies/${mov.id}`}></Link>}
              />
              <h3>{mov.title}</h3>
              <button>＋</button>
              <button>♥️</button>
              <figcaption>{mov.year}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Movies;
