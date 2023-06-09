import './NavBar.css';

// Components
import { NavLink, Link } from 'react-router-dom';
import {
  BsSearch, BsHouseDoorFill, BsFillPersonFill, BsFillCameraFill,
} from 'react-icons/bs';

const NavBar = () => {
  return (
    <div>
      <nav id="nav">
        <Link to="/">ReactGram</Link>
        <form id="search-form">
          <BsSearch />
          <input type="text" placeholder="Search" />
        </form>
        <ul id="nav-links">
          <li>
            <NavLink to="/">
              <BsHouseDoorFill />
            </NavLink>
          </li>
          <li>
            <NavLink to="/login">Login</NavLink>
          </li>
          <li>
            <NavLink to="/register">Register</NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default NavBar;
