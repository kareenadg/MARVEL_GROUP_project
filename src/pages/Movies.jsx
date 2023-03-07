import './Movies.css';

import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { ThemeFunction } from '../context/themeContext';
import Spinner from '../ui/Spinner';

const Movies = () => {
  const { changeTheme } = ThemeFunction();
  const [loaded, setLoaded] = useState(false);
  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);

  const phases = ['Phase 1', 'Phase 2', 'Phase 3', 'Phase 4', 'Phase 5'];
  const years = [
    2008, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2021, 2022, 2023,
  ];
  const [movieTitleFav, setMovieTitleFav] = useState([]);
  const [movieTitleWatched, setMovieTitleWatched] = useState([]);
  useEffect(() => {
    fetch('https://63ef88eb4d5eb64db0cbc71f.mockapi.io/movies')
      .then((res) => res.json())
      .then((res) => {
        setLoaded(true);
        setMovies(res);
        setFilteredMovies(res);
      });
    checkFavs();
    checkWatched();
  }, []);

  const filteredPhase = (actualPhase) => {
    const filterPhase = movies.filter(
      (mov) => mov.phase.toLowerCase() === actualPhase.toLowerCase(),
    );
    setFilteredMovies(filterPhase);
  };

  const filteredYear = (actualYear) => {
    const filterYear = movies.filter((mov) => mov.year === actualYear);
    setFilteredMovies(filterYear);
  };

  const filterMov = (keyword) => {
    const filter = movies.filter((mov) =>
      mov.title.toLowerCase().includes(keyword.toLowerCase()),
    );
    setFilteredMovies(filter);
  };

  const sorted = () => {
    const moviesCopy = [...movies];
    const movsort = moviesCopy.sort((a, b) => (a.year > b.year ? -1 : 1));
    return movsort;
  };
  const checkFavs = async () => {
    const res = await fetch('https://63f9dd59473885d837d3ef84.mockapi.io/favorites');
    const data = await res.json();
    const userFav = data.filter((fav) => fav.username == localStorage.getItem('user'));
    const userFavTitle = userFav.map((key) => key.title);

    setMovieTitleFav(userFavTitle);
  };
  const checkWatched = async () => {
    const res = await fetch('https://63f9dd59473885d837d3ef84.mockapi.io/watchlist');
    const data = await res.json();
    const userWatched = data.filter(
      (watched) => watched.username == localStorage.getItem('user'),
    );
    const userWatchedTitle = userWatched.map((key) => key.title);

    setMovieTitleWatched(userWatchedTitle);
  };

  const createFavorite = (mov) => {
    const NewFav = {
      username: localStorage.getItem('user'),
      title: mov.title,
      year: mov.year,
      poster: mov.poster,
    };
    fetch(`https://63f9dd59473885d837d3ef84.mockapi.io/favorites`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(NewFav),
    });
  };

  const createWatchlist = (mov) => {
    const NewList = {
      username: localStorage.getItem('user'),
      title: mov.title,
      year: mov.year,
      poster: mov.poster,
    };
    fetch(`https://63f9dd59473885d837d3ef84.mockapi.io/watchlist`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(NewList),
    });
  };

  /*   const deleteFav = (item) => {
    fetch(`https://63f9dd59473885d837d3ef84.mockapi.io/favorites?title=${item}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }; */

  return (
    <div className="movies">
      <div
        className="search"
        style={
          localStorage.getItem('color') == 'dark'
            ? { borderBottomColor: '#ffffff' }
            : { borderBottomColor: '#1e1c1c' }
        }
      >
        {localStorage.getItem('color') === 'dark' ? (
          <img
            src="https://res.cloudinary.com/dnb4ujbgr/image/upload/v1677347391/magnifying-glass_pi3wxw-white_qq12kv.svg"
            alt="Magnifying Glass"
          />
        ) : (
          <img
            src="https://res.cloudinary.com/dlvbfzkt9/image/upload/v1677272349/MARVEL/magnifying-glass_pi3wxw.svg"
            alt="Magnifying Glass"
          />
        )}
        <input
          type="text"
          placeholder="SEARCH"
          onChange={(ev) => filterMov(ev.target.value)}
        />
      </div>
      <div className="filters">
        <h3>SORT:</h3>
        <button
          onClick={() => {
            setFilteredMovies(sorted());
          }}
        >
          BY RECENT DATE
        </button>
        <button
          onClick={() => {
            setFilteredMovies(movies);
          }}
        >
          CHRONOLOGICALLY
        </button>
        <select id="phases" onChange={(ev) => filteredPhase(ev.target.value)}>
          <option value="-">- Choose Phase</option>
          {phases.map((phase) => (
            <option key={phase} value={phase}>
              {phase}
            </option>
          ))}
        </select>
        <select id="years" onChange={(ev) => filteredYear(ev.target.value)}>
          <option value="-">- Choose Year</option>
          {years.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>
      <div className="movies-container">
        {loaded ? (
          filteredMovies.map((mov) => (
            <figure key={mov.id}>
              <div className="mov-poster">
                <Link to={`/movies/${mov.id}`}>
                  <img src={mov.poster} alt={mov.title} />
                  <div className="overlay">
                    <p>See more details</p>
                  </div>
                </Link>
              </div>
              <div className="mov-title">
                <h3>
                  {mov.title} ({mov.year})
                </h3>
              </div>
              <div className="mov-buttons">
                {!movieTitleWatched.includes(mov.title) && (
                  <button
                    onClick={() => {
                      createWatchlist(mov);
                    }}
                  >
                    +
                  </button>
                )}
                {!movieTitleFav.includes(mov.title) && (
                  <label className="container">
                    <input
                      type="checkbox"
                      className="heart"
                      onChange={() => {
                        createFavorite(mov);
                      }}
                    />
                    <div className="checkmark">
                      <svg viewBox="0 0 256 256">
                        <rect fill="none" height="256" width="256"></rect>
                        <path
                          d="M224.6,51.9a59.5,59.5,0,0,0-43-19.9,60.5,60.5,0,0,0-44,17.6L128,59.1l-7.5-7.4C97.2,28.3,59.2,26.3,35.9,47.4a59.9,59.9,0,0,0-2.3,87l83.1,83.1a15.9,15.9,0,0,0,22.6,0l81-81C243.7,113.2,245.6,75.2,224.6,51.9Z"
                          strokeWidth="20px"
                          stroke="#FF5353"
                          fill="none"
                        ></path>
                      </svg>
                    </div>
                  </label>
                )}
              </div>
            </figure>
          ))
        ) : (
          <Spinner />
        )}
      </div>
    </div>
  );
};

export default Movies;
