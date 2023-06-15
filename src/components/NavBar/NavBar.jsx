import './NavBar.css';

import { NavLink, Link, useNavigate } from 'react-router-dom';
import {
  BsSearch, BsHouseDoorFill, BsFillPersonFill, BsFillCameraFill, BsPower,
} from 'react-icons/bs';

// Hooks
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useAuth } from '../../hooks/useAuth';

import { logout, reset } from '../../slices/authSlice';

const NavBar = () => {
  const { auth } = useAuth();
  const { user } = useSelector((state) => state.auth);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    dispatch(reset());

    navigate('/login');
  };
  return (
    <div>
      <nav id="nav">
        <Link to="/">ReactGram</Link>
        <form id="search-form">
          <BsSearch />
          <input type="text" placeholder="Search" />
        </form>
        <ul id="nav-links">
          {auth ? (
            <>
              <li>
                <NavLink to="/">
                  <BsHouseDoorFill />
                </NavLink>
              </li>

              {user && (
              <li>
                <NavLink to={`users/${user._id}`}>
                  <BsFillCameraFill />
                </NavLink>
              </li>
              )}
              <li>
                <NavLink to="/profile">
                  <BsFillPersonFill />
                </NavLink>
              </li>
              <li>
                <NavLink onClick={handleLogout} to="/" title="Log out">
                  <BsPower />
                </NavLink>
              </li>
            </>
          ) : (
            <>
              <li>
                <NavLink to="/login">Login</NavLink>
              </li>
              <li>
                <NavLink to="/register">Register</NavLink>
              </li>
            </>
          )}
        </ul>
      </nav>
    </div>
  );
};

export default NavBar;
