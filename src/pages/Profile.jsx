import './Profile.css';

import { useEffect, useState } from 'react';

import useFetch from '../hooks/useFetch';
import Avatar from '../ui/avatar';
import Button from '../ui/Buttons';

const Profile = () => {
  const [showFavourites, setShowFavourites] = useState(true);
  const [showWatchlist, setShowWatchlist] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState([]);
  const [filteredComments, setFilteredComments] = useState([]);
  const [favs] = useFetch('https://63ef88eb4d5eb64db0cbc71f.mockapi.io/movies');
  const [watchlist] = useFetch('https://63ef88eb4d5eb64db0cbc71f.mockapi.io/movies');

  const getForumInfo = async () => {
    const res = await fetch('https://63f885816978b1f9105b3d9e.mockapi.io/reviews');
    const data = await res.json();
    setComments(data);
    setFilteredComments(data);
  };

  const filterComments = (keyword) => {
    const filter = comments.filter((comment) => comment.username.includes(keyword));
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
        <Button
          text="Favourites"
          action={() => {
            setShowFavourites(true), setShowWatchlist(false), setShowComments(false);
          }}
        />

        <Button
          text="Watchlist"
          action={() => {
            setShowFavourites(false), setShowWatchlist(true), setShowComments(false);
          }}
        />

        <button
          onClick={() => {
            setShowFavourites(false),
              setShowWatchlist(false),
              setShowComments(true),
              filterComments(localStorage.getItem('user'));
          }}
        >
          Comments
        </button>
      </div>

      {showFavourites && (
        <div>
          {favs &&
            favs.map((item) => (
              <h2 key={item.id}>
                {' '}
                {item.title} ({item.phase})
              </h2>
            ))}
        </div>
      )}

      {showWatchlist && (
        <div>
          <div className="movies-container">
            {favs &&
              favs.map((item) => (
                <figure key={item.id}>
                  <img src={item.poster} alt={item.title} />
                </figure>
              ))}
          </div>
        </div>
      )}

      {showComments && (
        <div>
          {filteredComments.length ? (
            filteredComments.map((review) => (
              <div key={review.id}>
                <h2>{review.title}</h2>
                <img src={review.avatar} alt={review.title} />
                <h3>{review.username}</h3>
                <h4>{review.date.slice(0, 10)}</h4>
                <p>{review.review}</p>
                <p>{review.likes}</p>
                <button onClick={() => deleteComments(review.id)}>Delete</button>
              </div>
            ))
          ) : (
            <h4> Post some comments in our forum</h4>
          )}
        </div>
      )}
    </main>
  );
};

export default Profile;
