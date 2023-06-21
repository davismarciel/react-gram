/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/label-has-associated-control */
import './Profile.css';

// Hooks
import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import {
  BsFillEyeFill, BsPencilFill, BsXLg, BsImage,
} from 'react-icons/bs';

import { useResetMessage } from '../../hooks/useResetMessage';

// Slices
import { getUserDetails } from '../../slices/userSlice';
import {
  publishPhoto, getUserPhotos, deletePhoto, updatePhoto, resetMessage,
} from '../../slices/photoSlice';

// Components
import Message from '../../components/Message/Message';

// Config
import { uploads } from '../../utils/config';

const Profile = () => {
  const [title, setTitle] = useState();
  const [image, setImage] = useState();

  const [editId, setEditId] = useState();
  const [editImage, setEditImage] = useState();
  const [editTitle, setEditTitle] = useState();

  const { id } = useParams();
  const dispatch = useDispatch();

  const { user, loading } = useSelector((state) => state.user);
  const { user: userAuth } = useSelector((state) => state.auth);

  const {
    photos,
    loading: loadingPhoto,
    error: errorPhoto,
    message: messagePhoto,
  } = useSelector((state) => state.photo);

  // New form and edit form refs
  const newPhotoForm = useRef();
  const editPhotoForm = useRef();

  const resetMessage = useResetMessage(dispatch);

  // Load user data
  useEffect(() => {
    dispatch(getUserDetails(id));
    dispatch(getUserPhotos(id));
  }, [dispatch, id]);

  if (loading) {
    return <p>Loading...</p>;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const photoData = {
      title,
      image,
    };

    const formData = new FormData();
    Object.keys(photoData)
      .forEach((key) => formData.append(key, photoData[key]));

    dispatch(publishPhoto(formData));

    setTitle();
    setImage();

    resetMessage();
  };

  const handleFile = (e) => {
    const image = e.target.files[0];
    setImage(image);
  };

  // Handle delete
  const handleDelete = (id) => {
    dispatch(deletePhoto(id));
    resetMessage();
  };

  // Show or hide a photo
  const hideOrShowForms = () => {
    newPhotoForm.current.classList.toggle('hide');
    editPhotoForm.current.classList.toggle('hide');
  };

  // Handle update
  const handleUpdate = (e) => {
    e.preventDefault();

    const photoData = {
      title: editTitle,
      id: editId,
    };

    dispatch(updatePhoto(photoData));

    resetMessage();
  };

  const handleEdit = (photo) => {
    if (editPhotoForm.current.classList.contains('hide')) {
      hideOrShowForms();
    }

    setEditId(photo._id);
    setEditTitle(photo.title);
    setEditImage(photo.image);
  };

  // Handle cancel edit
  const handleCancelEdit = (e) => {
    e.preventDefault();
    hideOrShowForms();
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
        <>
          <div className="new-photo" ref={newPhotoForm}>
            <h3>Share your moments with photos</h3>
            <form onSubmit={handleSubmit}>
              <label>
                <span>Title</span>
                <input
                  type="text"
                  placeholder="Title"
                  onChange={(e) => setTitle(e.target.value)}
                  value={title || ''}
                />
              </label>
              <label>
                <label>
                  <span>
                    Select a image
                    <BsImage className="image-icon" />
                  </span>
                  <input type="file" placeholder="Title" onChange={handleFile} />
                </label>
              </label>
              {!loadingPhoto && <button type="submit">Share</button>}
              {loadingPhoto && (
                <button type="submit" disabled>Sharing...</button>
              )}
            </form>
          </div>
          <div className="edit-photo hide" ref={editPhotoForm}>
            <p>Editando:</p>
            {editImage && (
              <img src={`${uploads}/photos/${editImage}`} alt={editTitle} />
            )}
            <form onSubmit={handleUpdate}>
              <input
                type="text"
                onChange={(e) => setEditTitle(e.target.value)}
                value={editTitle || ''}
              />
              <button type="submit">Edit</button>
              <button className="cancel-btn" onClick={handleCancelEdit}>
                Cancel edit
              </button>
            </form>
          </div>
          {errorPhoto && <Message msg={errorPhoto} type="error" />}
          {messagePhoto && <Message msg={messagePhoto} type="success" />}
        </>
      )}
      <div className="user-photos">
        <h2>Shared photos</h2>
        <div className="photos-container">
          {photos
            && photos.map((photo) => (
              <div className="photo" key={photo._id}>
                {photo.image && (
                  <img
                    src={`${uploads}/photos/${photo.image}`}
                    alt={photo.title}
                  />
                )}
                {id === userAuth._id ? (
                  <div className="actions">
                    <Link to={`/photos/${photo._id}`}>
                      <BsFillEyeFill />
                    </Link>
                    <BsPencilFill onClick={() => handleEdit(photo)} />
                    <BsXLg onClick={() => handleDelete(photo._id)} />
                  </div>
                ) : (
                  <Link className="btn" to={`/photos/${photo._id}`}>
                    Show
                  </Link>
                )}
              </div>
            ))}
          {photos.length === 0 && <p>There's no photos yet</p>}
        </div>
      </div>
    </div>
  );
};

export default Profile;
