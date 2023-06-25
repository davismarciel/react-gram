/* eslint-disable react/prop-types */
import './Photos.css';

import { Link } from 'react-router-dom';

import { uploads } from '../../utils/config';

const Photos = ({ photo }) => {
  return (
    <div className="img">
      {photo.image && (
        <Link to={`/photos/${photo._id}`}>
          <img src={`${uploads}/photos/${photo.image}`} alt={photo.title} />
        </Link>
      )}
      <h2>{photo.title}</h2>
      <p className="photo-autor">
        Shared by:
        {' '}
        <Link to={`users/${photo.userId}`}>{photo.userName}</Link>
      </p>
    </div>
  );
};

export default Photos;
