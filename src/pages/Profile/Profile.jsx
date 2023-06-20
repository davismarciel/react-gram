/* eslint-disable jsx-a11y/label-has-associated-control */
import './Profile.css';

// Hooks
import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import {
  BsFillEyeFill, BsPencilFill, BsXLg, BsImage,
} from 'react-icons/bs';

// Slices
import { getUserDetails } from '../../slices/userSlice';
import { publishPhoto, getUserPhotos, resetMessage } from '../../slices/photoSlice';

// Components
import Message from '../../components/Message/Message';

// Config
import { uploads } from '../../utils/config';

const Profile = () => {
  const [title, setTitle] = useState();
  const [image, setImage] = useState();
  const [photo, setPhoto] = useState();

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

  // Load user data
  useEffect(() => {
    dispatch(getUserDetails(id));
    dispatch(getUserPhotos(id));
  }, [dispatch, id]);

  // if (loading) {
  //   return <p>Loading...</p>;
  // }

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

    setTitle('');

    console.log(formData);
    console.log(image);

    setTimeout(() => {
      dispatch(resetMessage());
    }, 2000);
  };

  const handleFile = (e) => {
    const image = e.target.files[0];

    setImage(image);
  };

  return (
    <div id="profile">
      <div className="profile-header" ref={newPhotoForm}>
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
            <input
              type="text"
              placeholder="Title"
              value={title || ''}
              onChange={(e) => setTitle(e.target.value)}
            />
          </label>
          <label>
            <span>
              Select image from your computer
              <BsImage className="image-icon" />
            </span>
            <input type="file" placeholder="Title" onChange={handleFile} />
          </label>
          {!loadingPhoto && <button type="submit">Share</button>}
          {loadingPhoto && (<button type="submit" disabled>Sharing...</button>)}
          {errorPhoto && <Message msg={errorPhoto} type="error" />}
          {messagePhoto && <Message msg={messagePhoto} type="success" />}
        </form>
      </div>
      // </div>
      )}
      <div className="user-photos">
        <h2>Posted photos</h2>
        <div className="photos-container">
          {photos && photos.map((photo) => (
            <div className="photo" key={photo._id}>
              {photo.image && (
                <img
                  src={`${uploads}/photos/${photo.image}`}
                  alt={photo.title}
                />
              )}
              {id === userAuth._id ? (
                <p>actions</p>
              ) : (<Link className="btn" to={`photos/${photo.id}`}>Show</Link>)}
            </div>
          ))}
          {photos.length === 0 && <p>There's no photos yet</p>}
        </div>
      </div>
    </div>
  );
};

export default Profile;
