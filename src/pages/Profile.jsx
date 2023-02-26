import './Profile.css';

import { useEffect, useState } from 'react';

import { ThemeFunction } from '../context/themeContext';
import Avatar from '../ui/avatar';
import Button from '../ui/Buttons';

const Profile = () => {
  const { changeTheme } = ThemeFunction();
  const [showContent, setShowContent] = useState(0);

  const [filteredComments, setFilteredComments] = useState([]);

  const [favs, setFavs] = useState([]);
  const [filteredFavs, setFilteredFavs] = useState([]);

  const [watchlist, setWatchlist] = useState([]);
  const [filteredWatchlist, setFilteredWatchlist] = useState([]);

  const getAvatarImg = async () => {
    const res = await fetch('https://63ef8360271439b7fe703fa3.mockapi.io/usersData');
    const data = await res.json();

    const userData = data.filter(
      (user) => user.username === localStorage.getItem('user'),
    );
    const userAvatar = userData.map((avatar) => avatar.avatar);
    localStorage.setItem('avatarImg', userAvatar[0]);
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
  };

  const getWatchlist = async () => {
    const res = await fetch('https://63f9dd59473885d837d3ef84.mockapi.io/watchlist');
    const data = await res.json();
    setWatchlist(data);
  };

  const deleteWatch = (id) => {
    fetch(`https://63f9dd59473885d837d3ef84.mockapi.io/watchlist/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });
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

    const userComments = data.filter((comment) =>
      comment.username.includes(localStorage.getItem('user')),
    );
    const sorted = userComments.sort((a, b) => (a.date > b.date ? -1 : 1));
    console.log(userComments);
    console.log(sorted);
    setFilteredComments(sorted);
  };

  const deleteFav = (id) => {
    fetch(`https://63f9dd59473885d837d3ef84.mockapi.io/favorites/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });
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
    getAvatarImg();
    getFavourites();
    getForumInfo();
    getWatchlist();
  }, []);

  return (
    <main className="profile">
      <div className="profile-user">
        <Avatar
          name={localStorage.getItem('user')}
          image={localStorage.getItem('avatarImg')}
          size="lg"
        />
        <h2>{localStorage.getItem('user')}</h2>
      </div>
      <div
        className="options"
        style={
          localStorage.getItem('color') == 'dark'
            ? { borderBottom: '1px solid #ffffff' }
            : { borderBottom: '3px solid black' }
        }
      >
        <button
          onClick={() => {
            setShowContent(0);
            filterFavs();
          }}
        >
          Favourites
        </button>

        <button
          onClick={() => {
            setShowContent(1);
            filterWatchlist();
          }}
        >
          Watchlist
        </button>

        <button
          onClick={() => {
            setShowContent(2);
            getForumInfo();
          }}
        >
          Comments
        </button>
      </div>

      {showContent === 0 ? (
        <div className="movies-container">
          {filteredFavs.length ? (
            filteredFavs.map((item) => (
              <figure key={item.id}>
                <img src={item.poster} alt={item.title} />
                <h3>{item.title}</h3>
                <button
                  className="deleteBtn"
                  onClick={() => {
                    deleteFav(item.id);
                  }}
                >
                  <img
                    src="https://res.cloudinary.com/dpidlverd/image/upload/v1677446011/replica/1345823_xh4jg1.png"
                    alt="basura"
                    style={
                      localStorage.getItem('color') == 'dark'
                        ? { filter: 'invert(100)' }
                        : { filter: 'none' }
                    }
                  />
                </button>
              </figure>
            ))
          ) : (
            <h4> Welcome!</h4>
          )}
        </div>
      ) : showContent === 1 ? (
        <div className="movies-container">
          {filteredWatchlist.length ? (
            filteredWatchlist.map((item) => (
              <figure key={item.id}>
                <img src={item.poster} alt={item.title} />
                <h3>{item.title}</h3>
                <button
                  className="deleteBtn"
                  onClick={() => {
                    deleteWatch(item.id);
                    console.log(item.id);
                  }}
                >
                  <img
                    src="https://res.cloudinary.com/dpidlverd/image/upload/v1677446011/replica/1345823_xh4jg1.png"
                    alt="basura"
                    style={
                      localStorage.getItem('color') == 'dark'
                        ? { filter: 'invert(100)' }
                        : { filter: 'none' }
                    }
                  />
                </button>
              </figure>
            ))
          ) : (
            <h4> Nothing to watch yet</h4>
          )}
        </div>
      ) : showContent === 2 ? (
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
                  <div className="review-text">
                    <h2>{review.title}</h2>
                    <h4>{review.date.slice(0, 10)}</h4>
                    <p>{review.review}</p>
                  </div>
                  <Button
                    text="Delete"
                    className="delete-btn"
                    variant="red"
                    action={() => {
                      deleteComments(review.id);
                    }}
                  />
                </div>
              </div>
            ))
          ) : (
            <h4> Post some comments in our forum</h4>
          )}
        </section>
      ) : (
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
    </main>
  );
};

export default Profile;
