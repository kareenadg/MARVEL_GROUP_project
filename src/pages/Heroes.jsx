import './Heroes.css';

import { useContext, useEffect, useState } from 'react';

import { UserContext } from '../context/userContext';

const Heroes = () => {
  const { user } = useContext(UserContext);
  const [reviews, setReviews] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState('');
  let today = new Date().toISOString();
  const [newReview, setNewReview] = useState({
    username: user,
    date: today.slice(0, 10),
    title: '',
    review: '',
  });

  const getReviews = async () => {
    const res = await fetch('https://63f885816978b1f9105b3d9e.mockapi.io/reviews');
    const data = await res.json();
    setLoaded(true);
    setReviews(data);
  };
  const createReview = (ev) => {
    ev.preventDefault();

    if (!newReview.title || !newReview.review) {
      setError('Rellena todos los campos');
    } else {
      setError('');
      fetch('https://63f885816978b1f9105b3d9e.mockapi.io/reviews', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newReview),
      }).then((res) => {
        getReviews();
      });
    }
  };

  useEffect(() => {
    getReviews();
  }, []);

  return (
    <div className="forum">
      <h1>Forum</h1>
      <form className="forum-form" onSubmit={(ev) => createReview(ev)}>
        <input
          type="text"
          placeholder="ie. Avengers review"
          onChange={(ev) => setNewReview({ ...newReview, title: ev.target.value })}
        />
        <textarea
          placeholder="Introduce your review..."
          onChange={(ev) => setNewReview({ ...newReview, review: ev.target.value })}
        />
        <button type="submit">Post review</button>
      </form>
      <h3>{error}</h3>

      {loaded ? (
        reviews.map((review) => (
          <div className="review-card" key={review.id}>
            <h2>{review.title}</h2>
            <img src={review.avatar} alt={review.title} />
            <h3>{review.username}</h3>
            <h4>{review.date.slice(0, 10)}</h4>
            <p>{review.review}</p>
            <p>{review.likes}</p>
          </div>
        ))
      ) : (
        <h1>Loading...</h1>
      )}
    </div>
  );
};

export default Heroes;
