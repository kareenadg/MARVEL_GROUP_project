import './Profile.css';

import { useState } from 'react';

import Avatar from '../ui/avatar';
import Button from '../ui/Buttons';

const Profile = () => {
  const [showFavourites, setShowFavourites] = useState(true);
  const [showWatchlist, setShowWatchlist] = useState(false);
  const [showComments, setShowComments] = useState(false);

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

        <Button
          text="Comments"
          action={() => {
            setShowFavourites(false), setShowWatchlist(false), setShowComments(true);
          }}
        />
      </div>

      {showFavourites && (
        <p>Aqui habría que hacer una petición al enpoint con los favoritos</p>
      )}

      {showWatchlist && (
        <p>Aqui habría que hacer una petición al enpoint con la watchlist</p>
      )}

      {showComments && (
        <p>Aqui habría que hacer una petición al enpoint con los comentarios</p>
      )}
    </main>
  );
};

export default Profile;
