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
  const [filteredFavs, setFilteredFavs] = useState([]);
  const [favs] = useFetch('https://63f9dd59473885d837d3ef84.mockapi.io/favorites');
  const [watchlist] = useFetch('https://63ef88eb4d5eb64db0cbc71f.mockapi.io/movies');

  const getForumInfo = async () => {
    const res = await fetch('https://63f885816978b1f9105b3d9e.mockapi.io/reviews');
    const data = await res.json();
    setComments(data);
    setFilteredComments(data);
  };

  const filterComments = () => {
    const filter = comments.filter((comment) => comment.username.includes(localStorage.getItem('user')));
    setFilteredComments(filter);
  };

  const filterFavs = (keyword) => {
    const filter = favs.filter((fav) => fav.username.includes(keyword));
    setFilteredFavs(filter);
  };

  const deleteComments = (id) => {
    fetch(`https://63f885816978b1f9105b3d9e.mockapi.io/reviews/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((res) => {
      filterComments();
    });
  };

  useEffect(() => {
    localStorage.setItem(
      'avatarImg',
      'https://res.cloudinary.com/ddu2qdsdp/image/upload/v1677237031/Marvel/photo-1438761681033-6461ffad8d80_cuvfkr.jpg',
    );
    getForumInfo();
  }, []);

  return (
    <main className="profile">
      <Avatar
        name={localStorage.getItem('user')}
        image="https://res.cloudinary.com/ddu2qdsdp/image/upload/v1677237031/Marvel/photo-1438761681033-6461ffad8d80_cuvfkr.jpg"
        size="lg"
      />
      <h2>{localStorage.getItem('user')}</h2>
      <div className="options">
        <button
          onClick={() => {
            setShowFavourites(true),
              setShowWatchlist(false),
              setShowComments(false),
              filterFavs(localStorage.getItem('user'));
          }}
        >
          Favourites
        </button>

        <button
          onClick={() => {
            setShowFavourites(false), setShowWatchlist(true), setShowComments(false);
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

      {showFavourites && (
        <div className="movies-container">
          {favs &&
            favs.map((item) => (
              <figure key={item.id}>
                <img src={item.poster} alt={item.title} />
                <h3>{item.title}</h3>
              </figure>
            ))}
        </div>
      )}

      {showWatchlist && (
        <div className="movies-container">
          {watchlist &&
            watchlist.map((item) => (
              <figure key={item.id}>
                <img src={item.poster} alt={item.title} />
                <h3>{item.title}</h3>
              </figure>
            ))}
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