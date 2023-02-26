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
  useEffect(() => {
    fetch('https://63ef88eb4d5eb64db0cbc71f.mockapi.io/movies')
      .then((res) => res.json())
      .then((res) => {
        setLoaded(true);
        setMovies(res);
        setFilteredMovies(res);
      });
    checkFavs();
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

  const deleteFav = (item) => {
    fetch(`https://63f9dd59473885d837d3ef84.mockapi.io/favorites?title=${item}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });
  };

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
              <Link to={`/movies/${mov.id}`}>
                <img src={mov.poster} alt={mov.title} />
              </Link>
              <div className="mov-title">
                <h3>
                  {mov.title} ({mov.year})
                </h3>
              </div>
              <div className="mov-buttons">
                <button
                  onClick={() => {
                    createWatchlist(mov);
                  }}
                >
                  ＋
                </button>
                {!movieTitleFav.includes(mov.title) ? (
                  <input
                    type="checkbox"
                    className="heart"
                    onChange={() => {
                      createFavorite(mov);
                    }}
                  />
                ) : (
                  <input
                    type="checkbox"
                    className="heart"
                    checked={true}
                    onChange={() => {
                      deleteFav(mov.title);
                    }}
                  />
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
