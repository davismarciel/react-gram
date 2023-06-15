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
          <Route path="/" element={auth ? <Home /> : <Navigate to="/login" />} />
          <Route path="/login" element={!auth ? <Login /> : <Navigate to="/" />} />
          <Route path="/register" element={!auth ? <Register /> : <Navigate to="/" />} />
        </Routes>
      </div>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
