/* eslint-disable jsx-a11y/label-has-associated-control */
import './EditProfile.css';

// Hooks
import { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { BsImage } from 'react-icons/bs';
// Slice
import { profile, updateProfile, resetMessage } from '../../slices/userSlice';

// Config
import { uploads } from '../../utils/config';

// Components
import Message from '../../components/Message/Message';

const EditProfile = () => {
  // Constructing user object
  const {
    user, loading, message, error,
  } = useSelector((state) => state.user);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [profileImage, setProfileImage] = useState('');
  const [password, setPassword] = useState('');
  const [bio, setBio] = useState('');
  const [previewImage, setPreviewImage] = useState('');
  const [isImageUpdated, setIsImageUpdated] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(profile());
  }, [dispatch]);

  // Fill form with user data
  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setBio(user.bio);
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userData = {
      name,
    };

    if (isImageUpdated) {
      userData.profileImage = profileImage;
    }

    if (bio) {
      userData.bio = bio;
    }

    if (password) {
      userData.password = password;
    }

    const formData = new FormData();
    Object.keys(userData).forEach((key) => formData.append(key, userData[key]));

    dispatch(updateProfile(formData));

    console.log(formData);

    setTimeout(() => {
      dispatch(resetMessage());
    }, 2000);
  };

  const handleFile = (e) => {
    const image = e.target.files[0];

    setPreviewImage(image);
    setProfileImage(image);
    setIsImageUpdated(true);
  };

  return (
    <div id="edit-profile">
      <h2>Edit your profile</h2>
      <p className="subtitle">
        Add your profile image
      </p>
      {(user.profileImage || previewImage) && (
        <img
          className="profile-image"
          src={
            previewImage
              ? URL.createObjectURL(previewImage)
              : `${uploads}/users/${user.profileImage}`
          }
          alt={user.name}
        />
      )}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={name || ''}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          disabled
          title="Cannot change email"
          value={email || ''}
          onChange={(e) => setEmail(e.target.value)}
        />
        <span>Profile image</span>
        <BsImage className="image-icon-edit" />
        <input type="file" onChange={handleFile} />
        <span>Bio</span>
        <input
          type="text"
          placeholder="Description"
          value={bio || ''}
          onChange={(e) => setBio(e.target.value)}
        />
        <span>Change password</span>
        <input
          type="password"
          placeholder="Type your new password"
          value={password || ''}
          onChange={(e) => setPassword(e.target.value)}
        />
        {!loading && <button type="submit">Edit</button>}
        {loading && <button type="submit" disabled>Editing...</button>}
        {error && <Message msg={error} type="error" />}
        {message && <Message msg={message} type="success" />}
      </form>
    </div>
  );
};

export default EditProfile;
