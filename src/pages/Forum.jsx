import './Forum.css';

import { useContext, useEffect, useState } from 'react';
import { useDebounce } from 'use-debounce';

import { UserContext } from '../context/userContext';

const Forum = () => {
  const { user } = useContext(UserContext);
  const [reviews, setReviews] = useState([]);
  const [printReviews, setPrintReviews] = useState([]);
  /* const [likeReviews, setLikeReviews] = useState([]); */
  const [keyword, setKeyword] = useState('');
  const [keywordValue] = useDebounce(keyword, 500);
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState('');
  let today = new Date().toISOString();
  const [newReview, setNewReview] = useState({
    username: user,
    date: today,
    title: '',
    review: '',
    likes: 0,
  });

  const getReviews = async () => {
    const res = await fetch('https://63f885816978b1f9105b3d9e.mockapi.io/reviews');
    const data = await res.json();
    setLoaded(true);
    const sorted = data.sort((a, b) => (a.date > b.date ? -1 : 1));
    console.log(sorted);
    setReviews(sorted);
    setPrintReviews(sorted);
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
      fetch('https://63f885816978b1f9105b3d9e.mockapi.io/myreviews', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newReview),
      }).then((res) => res.json());
    }
  };

  useEffect(() => {
    getReviews();
  }, [keywordValue]);

  return (
    <div className="forum">
      {console.log(reviews)}
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

      <input
        type="text"
        onChange={(ev) => {
          setKeyword(ev.target.value);
          setPrintReviews(
            reviews.filter((review) =>
              review.title.toLowerCase().includes(ev.target.value.toLowerCase()),
            ),
          );
        }}
      ></input>
      {/*       <button onClick={() => setPrintReviews(reviews)}>Newest</button>
      <button
        onClick={() =>
          setPrintReviews(() => reviews.sort((a, b) => (a.likes > b.likes ? -1 : 1)))
        }
      >
        Hottest
      </button> */}
      {console.log('filter', printReviews)}
      {loaded ? (
        printReviews?.map((review) => (
          <div className="review-card" key={review.id}>
            <img src={review.avatar} alt={review.title} />
            <div className="review-user">
              <h3>{review.username}</h3>
              <h4>{review.date.slice(0, 10)}</h4>
            </div>
            <div className="review-content">
              <h2>{review.title}</h2>
              <p>{review.review}</p>
              <p>{review.likes}</p>
            </div>
          </div>
        ))
      ) : (
        <h1>Loading...</h1>
      )}
    </div>
  );
};

export default Forum;
