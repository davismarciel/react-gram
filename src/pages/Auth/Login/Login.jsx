import '../Auth.css';

// Router
import { Link, useNavigate } from 'react-router-dom';

// Hooks
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';

// Redux
import { login, reset } from '../../../slices/authSlice';

// Component
import Message from '../../../components/Message/Message';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error } = useSelector((state) => state.auth);

  const handleSubmit = (e) => {
    e.preventDefault();

    const user = {
      email,
      password,
    };

    dispatch(login(user));
  };

  useEffect(() => {
    dispatch(reset());
  }, [dispatch]);

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
        {!loading && <button type="submit">Login</button>}
        {loading && <button type="submit" disabled>Logging...</button>}
        {error && <Message msg={error} type="error" />}

      </form>
      <Link to="/register">
        Don't have an account?
        Sign up
      </Link>
    </div>
  );
};

export default Login;
