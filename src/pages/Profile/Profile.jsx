/* eslint-disable jsx-a11y/label-has-associated-control */
import './Profile.css';

// Hooks
import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import {
  BsFillEyeFill, BsPencilFill, BsXLg, BsImage,
} from 'react-icons/bs';
import { getUserDetails } from '../../slices/userSlice';

// Components
import Message from '../../components/Message/Message';

// Config
import { uploads } from '../../utils/config';

const Profile = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { user, loading } = useSelector((state) => state.user);
  const { user: userAuth } = useSelector((state) => state.auth);

  // New form and edit form refs
  const newPhotoForm = useRef();
  const editPhotoForm = useRef();

  // Load user data
  useEffect(() => {
    dispatch(getUserDetails(id));
  }, [dispatch, id]);

  if (loading) {
    return <p>Loading...</p>;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div id="profile">
      <div className="profile-header">
        {user.profileImage && (
        <img src={`${uploads}/users/${user.profileImage}`} alt={user.name} />
        )}
        <div className="profile-description">
          <h2>{user.name}</h2>
          <p>{user.bio}</p>
        </div>
      </div>
      {id === userAuth._id && (
      // <div className="add-photo-container"> add "new page" when adding photos
      <div className="new-photo" ref={newPhotoForm}>
        <form onSubmit={handleSubmit}>
          <h3>Share your photos and stories:</h3>
          <label>
            <span>Title</span>
            <input type="text" placeholder="Title" />
          </label>
          <label className="custom-file-upload">
            <BsImage />
            <span>
              Select image from your computer
            </span>
            <input type="file" placeholder="Title" />
          </label>
          <button type="submit">Share</button>
        </form>
      </div>
      // </div>
      )}
    </div>
  );
};

export default Profile;
