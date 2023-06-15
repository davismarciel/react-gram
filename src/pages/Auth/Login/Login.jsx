import '../Auth.css';

// Router
import { Link } from 'react-router-dom';

// Hooks
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

// Component
import Message from '../../../components/Message/Message';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div id="login">
      <h1>ReactGram</h1>
      <p className="subtitle">Sign in to see what's the news</p>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
      <Link to="/register">Don't have an account? Sign up</Link>
    </div>
  );
};

export default Login;
