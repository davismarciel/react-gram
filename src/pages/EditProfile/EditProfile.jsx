import './EditProfile.css';

const EditProfile = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="edit-profile">
      <h2>Edit your profile</h2>
      <p className="subtitle">Add your profile image</p>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Name" />
        <input type="email" placeholder="Email" disabled title="Cannot change email" />
        <label htmlFor="img">
          <span>Profile image:</span>
          <input type="file" />
        </label>
        <label htmlFor="bio">
          <span>Bio:</span>
          <input type="text" placeholder="Description" />
        </label>
        <label htmlFor="bio">
          <span>Change password</span>
          <input type="password" placeholder="Type your new password" />
        </label>
        <button type="submit">Edit</button>
      </form>
    </div>
  );
};

export default EditProfile;
