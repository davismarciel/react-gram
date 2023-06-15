import './EditProfile.css';

// Hooks
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

// Slice
import { profile, resetMessage } from '../../slices/userSlice';

// Config
import { uploads } from '../../utils/config';

// Components
import Message from '../../components/Message/Message';

const EditProfile = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [profileImage, setProfileImage] = useState('');
  const [password, setPassword] = useState('');
  const [bio, setBio] = useState('');
  const [previewImage, setPreviewImage] = useState('');

  const dispatch = useDispatch();

  const {
    user, loading, message, error,
  } = useSelector((state) => state.user);

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

  console.log(user);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div id="edit-profile">
      <h2>Edit your profile</h2>
      <p className="subtitle">Add your profile image</p>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          disabled
          title="Cannot change email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="img">
          <span>Profile image:</span>
          <input type="file" />
        </label>
        <label htmlFor="bio">
          <span>Bio:</span>
          <input
            type="text"
            placeholder="Description"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
          />
        </label>
        <label htmlFor="bio">
          <span>Change password</span>
          <input
            type="password"
            placeholder="Type your new password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <button type="submit">Edit</button>
      </form>
    </div>
  );
};

export default EditProfile;
