/* eslint-disable react/jsx-one-expression-per-line */
import './Search.css';

import { useEffect } from 'react';
import { Link } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';

import { useResetMessage } from '../../hooks/useResetMessage';

import Photos from '../../components/Photos/Photos';
import Like from '../../components/Like/Like';

import { useQuery } from '../../hooks/useQuery';

import { like, searchPhotos } from '../../slices/photoSlice';

const Search = () => {
  const query = useQuery();
  const search = query.get('q');

  const dispatch = useDispatch();

  const resetMessage = useResetMessage(dispatch);

  const { user } = useSelector((state) => state.auth);
  const { photos } = useSelector((state) => state.photo);

  useEffect(() => {
    dispatch(searchPhotos(search));
  }, [dispatch, search]);

  const handleLike = (photo) => {
    dispatch(like(photo._id));

    resetMessage();
  };

  return (
    <div id="search">
      <h2>Results for: "{search}"</h2>
      {photos && photos.map((photo) => (
        <div key={photo._id}>
          <Photos photo={photo} />
          <Like photo={photo} user={user} handleLike={handleLike} />
          <Link className="btn" to={`/photos/${photo._id}`}>See more...</Link>
          <div className="border" />
        </div>
      ))}
      {photos && photos.length === 0 && (
        <h2 className="no-photos">
          Post not found or was removed
        </h2>
      )}
    </div>
  );
};

export default Search;
