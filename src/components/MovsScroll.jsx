import './MovsScroll.css';

import { useEffect, useState } from 'react';
import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import Spinner from '../ui/Spinner';

const MovsScroll = () => {
  const [recentMov, setRecentMov] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const ref = useRef();
  const navigate = useNavigate();

  const scroll = (offset) => {
    ref.current.scrollLeft += offset;
  };
  const getRecent = () => {
    fetch(`https://63ef88eb4d5eb64db0cbc71f.mockapi.io/movies`)
      .then((res) => res.json())
      .then((res) => {
        const sorted = res.sort((a, b) => (a.year > b.year ? -1 : 1));
        let recentMovs = [];
        for (let i = 0; i < 15; i++) {
          recentMovs = [...recentMovs, sorted[i]];
        }
        setRecentMov(recentMovs);
      });
    setLoaded(true);
  };
  useEffect(() => {
    getRecent();
  }, []);

  return (
    <section className="movie-carousel">
      <div className="movie-carousel-head">
        <h1>Recent movies</h1>

        <button
          onClick={() => {
            navigate('/movies');
          }}
        >
          View All
        </button>
      </div>

      <div className="scroll-container">
        <button className="prev" onClick={() => scroll(-1000)}>
          <img
            src="https://res.cloudinary.com/dnb4ujbgr/image/upload/v1676822765/Giphy/svg_xml_base64_PHN2ZyB3aWR0aD0iMTVweCIgaGVpZ2h0PSIzMHB4IiB2aWV3Qm94PSIwIDAgMTUgMzAiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBzdHJva2U9Im5vbmUiIGZpbGw9Im5vbmUiPjxnIHRyYW5zZm9ybT0idHJhbnN_afv3jd.svg"
            alt="prev icon"
          />
        </button>
        <div className="recent-movies" ref={ref}>
          {loaded ? (
            recentMov.map((mov) => <img src={mov.poster} alt={mov.title} key={mov.id} />)
          ) : (
            <Spinner />
          )}
        </div>
        <button className="next" onClick={() => scroll(1000)}>
          <img
            src="https://res.cloudinary.com/dnb4ujbgr/image/upload/v1676822765/Giphy/svg_xml_base64_PHN2ZyB3aWR0aD0iMTVweCIgaGVpZ2h0PSIzMHB4IiB2aWV3Qm94PSIwIDAgMTUgMzAiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBzdHJva2U9Im5vbmUiIGZpbGw9Im5vbmUiPjxnIHRyYW5zZm9ybT0idHJhbnN_afv3jd.svg"
            alt="next icon"
          />
        </button>
      </div>
    </section>
  );
};

export default MovsScroll;
