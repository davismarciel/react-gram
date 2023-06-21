import './Photo.css';

// React hooks
import { Link, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

// Slice
import { getPhoto, like } from '../../slices/photoSlice';

// Config
import { uploads } from '../../utils/config';

// Components
import Message from '../../components/Message/Message';
import Photos from '../../components/Photos/Photos';
import Like from '../../components/Like/Like';

const Photo = () => {
  const { id } = useParams();

  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const {
    photo, loading, error, message,
  } = useSelector((state) => state.photo);

  // Comments

  // Load data
  useEffect(() => {
    dispatch(getPhoto(id));
  }, [dispatch, id]);

  // Likes
  const handleLike = () => {
    dispatch(like(photo._id));
  };

  if (loading) {
    return <p>Loading</p>;
  }

  return (
    <div id="photo">
      <Photos photo={photo} />
      <Like photo={photo} user={user} handleLike={handleLike} />
      <div className="message-container">
        {error && <Message msg={message} type="error" />}
        {message && <Message msg={message} type="success" />}
      </div>
    </div>
  );
};

export default Photo;
