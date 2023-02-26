import './Forum.css';

import { useContext, useEffect, useRef, useState } from 'react';
import { useDebounce } from 'use-debounce';

import { ThemeFunction } from '../context/themeContext';
import { UserContext } from '../context/userContext';
import Avatar from '../ui/Avatar';
import Button from '../ui/Buttons';
import Spinner from '../ui/Spinner';

const Forum = () => {
  const { changeTheme } = ThemeFunction();
  const { user } = useContext(UserContext);
  const [reviews, setReviews] = useState([]);
  const [printReviews, setPrintReviews] = useState([]);
  const [keyword, setKeyword] = useState('');
  const [keywordValue] = useDebounce(keyword, 500);
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState('');
  const titleRef = useRef(null);
  const textRef = useRef(null);

  let today = new Date().toISOString();

  const [newReview, setNewReview] = useState({
    username: user,
    avatar: localStorage.getItem('avatarImg'),
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
      setError('Complete all the fields, please');
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
  }, [keywordValue]);

  return (
    <div className="forum">
      <section
        className="forum-search"
        style={
          localStorage.getItem('color') == 'dark'
            ? { borderBottomColor: '#ffffff' }
            : { borderBottomColor: '#1e1c1c' }
        }
      >
        {localStorage.getItem('color') === 'dark' ? (
          <img
            src="https://res.cloudinary.com/dnb4ujbgr/image/upload/v1677347391/magnifying-glass_pi3wxw-white_qq12kv.svg"
            alt="Magnifying Glass"
          />
        ) : (
          <img
            src="https://res.cloudinary.com/dlvbfzkt9/image/upload/v1677272349/MARVEL/magnifying-glass_pi3wxw.svg"
            alt="Magnifying Glass"
          />
        )}
        <input
          type="text"
          placeholder="search"
          className="dark"
          onChange={(ev) => {
            setKeyword(ev.target.value);
            setPrintReviews(
              reviews.filter((review) =>
                review.title.toLowerCase().includes(ev.target.value.toLowerCase()),
              ),
            );
          }}
        ></input>
      </section>
      <section
        className="create-review"
        style={
          localStorage.getItem('color') == 'dark'
            ? { backgroundColor: '#1e1c1c' }
            : { backgroundColor: 'white' }
        }
      >
        <div className="form-user">
          <Avatar
            image={localStorage.getItem('avatarImg')}
            name="user avatar"
            size="md"
          />
          <h3>{localStorage.getItem('user')}</h3>
        </div>
        <form className="forum-form" onSubmit={(ev) => createReview(ev)}>
          <input
            type="text"
            placeholder="ie. Avengers review"
            ref={titleRef}
            onChange={(ev) => setNewReview({ ...newReview, title: ev.target.value })}
          />
          <textarea
            placeholder="Introduce your review..."
            ref={textRef}
            onChange={(ev) => setNewReview({ ...newReview, review: ev.target.value })}
          />
          <h3>{error}</h3>
          <Button
            text="Post review"
            variant="red"
            className="post-button"
            action={() => {
              titleRef.current.value = '';
              textRef.current.value = '';
            }}
          />
        </form>
      </section>
      <section className="forum-content">
        {loaded ? (
          printReviews.map((review) => (
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
              </div>
            </div>
          ))
        ) : (
          <Spinner />
        )}
      </section>
    </div>
  );
};

export default Forum;
