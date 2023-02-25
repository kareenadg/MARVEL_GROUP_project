import './Profile.css';

import { useEffect, useState } from 'react';

import useFetch from '../hooks/useFetch';
import Avatar from '../ui/avatar';

const Profile = () => {
  const [showFavourites, setShowFavourites] = useState(true);
  const [showWatchlist, setShowWatchlist] = useState(false);
  const [showComments, setShowComments] = useState(false);

  const [comments, setComments] = useState([]);
  const [filteredComments, setFilteredComments] = useState([]);

  const [favs, setFavs] = useState([]);
  const [filteredFavs, setFilteredFavs] = useState([]);

  const [watchlist, setWatchlist] = useState([]);
  const [filteredWatchlist, setFilteredWatchlist] = useState([]);

  const getFavourites = async () => {
    const res = await fetch('https://63f9dd59473885d837d3ef84.mockapi.io/favorites');
    const data = await res.json();
    setFavs(data);
  };

  const filterFavs = () => {
    const filter = favs.filter((fav) =>
      fav.username.includes(localStorage.getItem('user')),
    );
    setFilteredFavs(filter);
  };

  const getWatchlist = async () => {
    const res = await fetch('https://63f9dd59473885d837d3ef84.mockapi.io/watchlist');
    const data = await res.json();
    setWatchlist(data);
  };

  const filterWatchlist = () => {
    const filter = favs.filter((watchItem) =>
      watchItem.username.includes(localStorage.getItem('user')),
    );
    setFilteredWatchlist(filter);
  };

  const getForumInfo = async () => {
    const res = await fetch('https://63f885816978b1f9105b3d9e.mockapi.io/reviews');
    const data = await res.json();
    setComments(data);
  };

  const filterComments = () => {
    const filter = comments.filter((comment) =>
      comment.username.includes(localStorage.getItem('user')),
    );
    setFilteredComments(filter);
  };

  const deleteComments = (id) => {
    fetch(`https://63f885816978b1f9105b3d9e.mockapi.io/reviews/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((res) => {
      getForumInfo();
      filterComments();
    });
  };

  useEffect(() => {
    localStorage.setItem(
      'avatarImg',
      'https://res.cloudinary.com/ddu2qdsdp/image/upload/v1677237031/Marvel/photo-1438761681033-6461ffad8d80_cuvfkr.jpg',
    );
    getForumInfo();
    getFavourites();
    getWatchlist();
  }, []);

  return (
    <main className="profile">
      <Avatar
        name={localStorage.getItem('user')}
        image="https://res.cloudinary.com/ddu2qdsdp/image/upload/v1677237031/Marvel/photo-1438761681033-6461ffad8d80_cuvfkr.jpg"
        size="lg"
      />
      <h2>{localStorage.getItem('user')}</h2>

      {localStorage.getItem('color') == 'ligth' ? (
        <div className="options lightline">
          <button
            onClick={() => {
              setShowFavourites(true), setShowWatchlist(false), setShowComments(false);
              filterFavs();
            }}
          >
            Favourites
          </button>

          <button
            onClick={() => {
              setShowFavourites(false), setShowWatchlist(true), setShowComments(false);
              filterWatchlist();
            }}
          >
            Watchlist
          </button>

          <button
            onClick={() => {
              setShowFavourites(false),
                setShowWatchlist(false),
                setShowComments(true),
                filterComments();
            }}
          >
            Comments
          </button>
        </div>
      ) : (
        <div className="options darkline">
          <button
            onClick={() => {
              setShowFavourites(true),
                setShowWatchlist(false),
                setShowComments(false),
                filterFavs();
            }}
          >
            Favourites
          </button>

          <button
            onClick={() => {
              setShowFavourites(false), setShowWatchlist(true), setShowComments(false);
              filterWatchlist();
            }}
          >
            Watchlist
          </button>

          <button
            onClick={() => {
              setShowFavourites(false),
                setShowWatchlist(false),
                setShowComments(true),
                filterComments();
            }}
          >
            Comments
          </button>
        </div>
      )}

      {showFavourites && (
        <div className="movies-container">
          {filteredFavs.length ? (
            filteredFavs.map((item) => (
              <figure key={item.id}>
                <img src={item.poster} alt={item.title} />
                <h3>{item.title}</h3>
              </figure>
            ))
          ) : (
            <h4> No favourites yet</h4>
          )}
        </div>
      )}

      {showWatchlist && (
        <div className="movies-container">
          {filteredWatchlist.length ? (
            filteredWatchlist.map((item) => (
              <figure key={item.id}>
                <img src={item.poster} alt={item.title} />
                <h3>{item.title}</h3>
              </figure>
            ))
          ) : (
            <h4> Nothing to wathc yet</h4>
          )}
        </div>
      )}

      {showComments && (
        <section className="forum-content">
          {filteredComments.length ? (
            filteredComments.map((review) => (
              <div className="review-card" key={review.id}>
                <div className="review-user">
                  <Avatar image={review.avatar} name={review.title} size="md" />
                  <h3>{review.username}</h3>
                </div>
                <div className="review-content">
                  <h2>{review.title}</h2>
                  <h4>{review.date.slice(0, 10)}</h4>
                  <p>{review.review}</p>
                  <p>{review.likes}</p>
                  <button onClick={() => deleteComments(review.id)}>Delete</button>
                </div>
              </div>
            ))
          ) : (
            <h4> Post some comments in our forum</h4>
          )}
        </section>
      )}
    </main>
  );
};

export default Profile;
