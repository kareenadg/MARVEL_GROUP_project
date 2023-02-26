import './Profile.css';

import { useEffect, useState } from 'react';

import { ThemeFunction } from '../context/themeContext';
import Avatar from '../ui/avatar';
import Button from '../ui/Buttons';

const Profile = () => {
  const { changeTheme } = ThemeFunction();
  const [showFavourites, setShowFavourites] = useState(false);
  const [showWatchlist, setShowWatchlist] = useState(false);
  const [showComments, setShowComments] = useState(false);

  let showProfile = true;


  const [comments, setComments] = useState([]);
  const [filteredComments, setFilteredComments] = useState([]);

  const [favs, setFavs] = useState([]);
  const [filteredFavs, setFilteredFavs] = useState([]);

  const [watchlist, setWatchlist] = useState([]);
  const [filteredWatchlist, setFilteredWatchlist] = useState([]);

  let avatarImg;
  const [filteredAvatarImg, setFilteredAvatarImg] = useState([]);

  const getAvatarImg = async () => {
    const res = await fetch('https://63ef8360271439b7fe703fa3.mockapi.io/usersData');
    const data = await res.json();
    avatarImg = data;

    filterAvatarImg(data);
  };
  const filterAvatarImg = () => {
    avatarImg.map((user) => {
      user.username.includes(localStorage.getItem('user')) &&
        setFilteredAvatarImg(user.avatar);
    });
    localStorage.setItem('avatarImg', filteredAvatarImg);
  };

  const getFavourites = async () => {
    const res = await fetch('https://63f9dd59473885d837d3ef84.mockapi.io/favorites');
    const data = await res.json();
    setFavs(data);
    console.log('función petición a favoritos');
    filterFavs();
  };

  const filterFavs = () => {
    const filter = favs.filter((fav) =>
      fav.username.includes(localStorage.getItem('user')),
    );
    setFilteredFavs(filter);
    console.log('función filtrado de favoritos');
    console.log(filteredFavs);
  };

  const getWatchlist = async () => {
    const res = await fetch('https://63f9dd59473885d837d3ef84.mockapi.io/watchlist');
    const data = await res.json();
    setWatchlist(data);
  };

  const filterWatchlist = () => {
    const filter = watchlist.filter((watchItem) =>
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
    getAvatarImg();
    localStorage.setItem('avatarImg', filteredAvatarImg);
    getFavourites();
    getForumInfo();
    getWatchlist();
  }, []);

  return (
    <main className="profile">
      <Avatar name={localStorage.getItem('user')} image={filteredAvatarImg} size="lg" />
      <h2>{localStorage.getItem('user')}</h2>

      {localStorage.getItem('color') == 'ligth' ? (
        <div className="options lightline">
          <button
            onClick={() => {
              setShowFavourites(true);
              setShowWatchlist(false);
              setShowComments(false);
              filterFavs();
            }}
          >
            Favourites
          </button>

          <button
            onClick={() => {
              setShowFavourites(false);
              setShowWatchlist(true);
              setShowComments(false);
              filterWatchlist();
            }}
          >
            Watchlist
          </button>

          <button
            onClick={() => {
              setShowFavourites(false);
              setShowWatchlist(false);
              setShowComments(true);
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
              setShowFavourites(true);
              setShowWatchlist(false);
              setShowComments(false);
              filterFavs();
            }}
          >
            Favourites
          </button>

          <button
            onClick={() => {
              setShowFavourites(false);
              setShowWatchlist(true);
              setShowComments(false);
              filterWatchlist();
            }}
          >
            Watchlist
          </button>

          <button
            onClick={() => {
              setShowFavourites(false);
              setShowWatchlist(false);
              setShowComments(true);
              filterComments();
            }}
          >
            Comments
          </button>
        </div>
      )}

      {showProfile && <h3>Welcome! this is your profile</h3>}

    

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
            <h4> Nothing to watch yet</h4>
          )}
        </div>
      )}
      {showComments && (
        <section className="forum-content">
          {filteredComments.length ? (
            filteredComments.map((review) => (
              <div
                className="review-card"
                key={review.id}
                style={
                  localStorage.getItem('color') == 'dark'
                    ? { backgroundColor: '#1e1c1c' }
                    : { backgroundColor: 'white' }
                }
              >
                <div className="review-user">
                  <Avatar image={review.avatar} name={review.title} size="md" />
                  <h3>{review.username}</h3>
                </div>
                <div className="review-content">
                  <h2>{review.title}</h2>
                  <h4>{review.date.slice(0, 10)}</h4>
                  <p>{review.review}</p>
                  <p>{review.likes}</p>
                  <Button
                    text="Delete"
                    className="delete-btn"
                    variant="red"
                    action={() => deleteComments(review.id)}
                  >
                    Delete
                  </Button>
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
