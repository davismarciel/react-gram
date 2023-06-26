/* eslint-disable react/self-closing-comp */
import './Home.css';

import React, { useEffect } from 'react';

import { Link } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';

import Like from '../../components/Like/Like';
import Photos from '../../components/Photos/Photos';

import { useResetMessage } from '../../hooks/useResetMessage';

import { getPhotos, like } from '../../slices/photoSlice';

const Home = () => {
  const dispatch = useDispatch();

  const resetMessage = useResetMessage(dispatch);

  const { user } = useSelector((state) => state.auth);
  const { photos, loading } = useSelector((state) => state.photo);

  // Load all photos
  useEffect(() => {
    dispatch(getPhotos());
  }, [dispatch]);

  const handleLike = (photo) => {
    dispatch(like(photo._id));

    resetMessage();
  };

  if (loading) {
    return <p>Carregando...</p>;
  }

  return (
    <div id="home">
      {photos && photos.map((photo) => (
        <div key={photo._id}>
          <Photos photo={photo} />
          <Like photo={photo} user={user} handleLike={handleLike} />
          <div className="border" />
        </div>
      ))}
      {photos && photos.length === 0 && (
        <h2 className="no-photos">
          There's no photos yet...
        </h2>
      )}
    </div>
  );
};

export default Home;
