import './NavBar.css';
import {
  NavLink, Link, useNavigate, Navigate,
} from 'react-router-dom';
import {
  BsSearch, BsHouseDoorFill, BsFillPersonFill, BsFillCameraFill, BsPower,
} from 'react-icons/bs';

import { MdOutlineAddAPhoto } from 'react-icons/md';

// Hooks
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useAuth } from '../../hooks/useAuth';

import { logout, reset } from '../../slices/authSlice';

const NavBar = () => {
  const [query, setQuery] = useState();

  const { auth } = useAuth();
  const { user } = useSelector((state) => state.auth);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    dispatch(reset());

    navigate('/login');
  };

  const handleSearch = (e) => {
    e.preventDefault();

    if (query) {
      return navigate(`/search?q=${query}`);
    }
  };

  return (
    <div>
      <nav id="nav">
        <Link className="actived" to="/">
          ReactGram
        </Link>
        <Link className="hider" to="/">
          <MdOutlineAddAPhoto className="icon" />
        </Link>
        {auth && (
        <form id="search-form" onSubmit={handleSearch}>
          <BsSearch />
          <input type="text" placeholder="Search" onChange={(e) => setQuery(e.target.value)} />
        </form>
        )}
        <ul id="nav-links">
          {auth ? (
            <>
              <li>
                <NavLink to="/">
                  <BsHouseDoorFill className="home-icon" />
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
