import './App.css';

// Router
import {
  BrowserRouter, Routes, Route, Navigate,
} from 'react-router-dom';

// Hooks
import { useAuth } from './hooks/useAuth';

// Components
import NavBar from './components/NavBar/NavBar';
import Footer from './components/Footer/Footer';

// Pages
import Home from './pages/Home/Home';
import Login from './pages/Auth/Login/Login';
import Register from './pages/Auth/Register/Register';
import EditProfile from './pages/EditProfile/EditProfile';
import Profile from './pages/Profile/Profile';
import Photo from './pages/Photo/Photo';
import Search from './pages/Search/Search';
import Error from './pages/Error/Error';

function App() {
  const { auth, loading } = useAuth();

  if (loading) {
    return <p>Loading...</p>;
  }
  return (
    <BrowserRouter>
      <NavBar />
      <div className="container">
        <Routes>
          <Route path="*" element={<Error />} />
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={auth ? <EditProfile /> : <Navigate to="/login" />} />
          <Route path="/users/:id" element={auth ? <Profile /> : <Navigate to="/login" />} />
          <Route path="/search" element={auth ? <Search /> : <Login />} />
          <Route path="/photos/:id" element={auth ? <Photo /> : <Navigate to="/login" />} />
          <Route path="/login" element={!auth ? <Login /> : <Navigate to="/" />} />
          <Route path="/register" element={!auth ? <Register /> : <Navigate to="/" />} />
        </Routes>
      </div>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
