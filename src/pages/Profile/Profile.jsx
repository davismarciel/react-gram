import './Profile.css';

// Hooks
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Link, useParams } from 'react-router-dom';
import { BsFillEyeFill, BsPencilFill, BsXLg } from 'react-icons/bs';

// Components
import Message from '../../components/Message/Message';

// Config
import { uploads } from '../../utils/config';

const Profile = () => {
  return (
    <h1>Profile</h1>
  );
};

export default Profile;
