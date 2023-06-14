import '../Auth.css';

// Hooks
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

// Components
import Message from '../../../components/Message/Message';

// Slice
import { register, reset } from '../../../slices/authSlice';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState();

  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);

  const handleSubmit = (e) => {
    e.preventDefault();

    const user = {
      name,
      email,
      password,
      confirmPassword,
    };

    console.log(user);

    dispatch(register(user));
  };

  // Clean all auth states
  useEffect(() => {
    dispatch(reset);
  }, [dispatch]);

  return (
    <div id="register">
      <h2>ReactGram</h2>
      <p className="subtitle">Sign out to see your friends photos</p>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={name || ''}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          value={email || ''}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password || ''}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="password"
          placeholder="Confirm your password"
          value={confirmPassword || ''}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        {!loading && <button type="submit">Register</button>}
        {loading && <button type="submit" disabled>Creating...</button>}
        {error && <Message msg={error} type="error" />}
      </form>
      <p>
        Already have an account?
        {' '}
        <Link to="/login">Sign in</Link>
      </p>
    </div>
  );
};

export default Register;
