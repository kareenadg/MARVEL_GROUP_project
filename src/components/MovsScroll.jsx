import './MovsScroll.css';

import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const MovsScroll = () => {
  const [recentMov, setRecentMov] = useState([]);
  const ref = useRef();
  const navigate = useNavigate();

  const scroll = (offset) => {
    ref.current.scrollLeft += offset;
  };

  const getRecent = () => {
    /* for (let i = 1; i < 16; i++) { */
    fetch(`https://63ef88eb4d5eb64db0cbc71f.mockapi.io/movies`)
      .then((res) => res.json())
      .then((res) => {
        const sorted = res.sort((a, b) => (a.year > b.year ? -1 : 1));
        setRecentMov(sorted);
      });
  };

  useEffect(() => {
    getRecent();
  });

  return (
    <div className="movie-scroll">
      <div>
        <h1>Recent Movies</h1>
      </div>
      <button onClick={() => navigate('/movies')}>View All</button>
      <div className="scroll-container">
        <button className="previous" onClick={() => scroll(-400)}>
          <img
            src="https://res.cloudinary.com/dnb4ujbgr/image/upload/v1676822765/Giphy/svg_xml_base64_PHN2ZyB3aWR0aD0iMTVweCIgaGVpZ2h0PSIzMHB4IiB2aWV3Qm94PSIwIDAgMTUgMzAiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBzdHJva2U9Im5vbmUiIGZpbGw9Im5vbmUiPjxnIHRyYW5zZm9ybT0idHJhbnN_afv3jd.svg"
            alt="previous icon"
          />
        </button>
        <div className="recent-movies">
          {recentMov.map((mov) => (
            <img src={mov.poster} alt={mov.title} key={mov.id} />
          ))}
        </div>
        <button className="next" onClick={() => scroll(400)}>
          <img
            src="https://res.cloudinary.com/dnb4ujbgr/image/upload/v1676822765/Giphy/svg_xml_base64_PHN2ZyB3aWR0aD0iMTVweCIgaGVpZ2h0PSIzMHB4IiB2aWV3Qm94PSIwIDAgMTUgMzAiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBzdHJva2U9Im5vbmUiIGZpbGw9Im5vbmUiPjxnIHRyYW5zZm9ybT0idHJhbnN_afv3jd.svg"
            alt="next icon"
          />
        </button>
      </div>
    </div>
  );
};

export default MovsScroll;
