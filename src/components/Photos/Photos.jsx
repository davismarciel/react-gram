/* eslint-disable react/prop-types */
import './Photos.css';

import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';

import { uploads } from '../../utils/config';

const Photos = ({ photo, id }) => {
  return (
    <div className="photo-title">

      {photo.image && (
        <img src={`${uploads}/photos/${photo.image}`} alt={photo.title} />
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
