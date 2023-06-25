import { url, requestConfig } from '../utils/config';

// Register an user
const register = async (data) => {
  const config = requestConfig('POST', data);

  try {
    const res = await fetch(`${url}/users/register`, config)
      .then((res) => res.json())
      .catch((err) => err);

    if (res._id) {
      localStorage.setItem('user', JSON.stringify(res));
    }
    return res;
  } catch (error) {
    throw new Error('Error');
  }
};

const logout = async () => {
  localStorage.removeItem('user');
};

// Sign in a user

const login = async (data) => {
  const config = requestConfig('POST', data);

  try {
    const res = await fetch(`${url}/users/login`, config)
      .then((res) => res.json())
      .catch((err) => err);

    if (res._id) {
      localStorage.setItem('user', JSON.stringify(res));
    }

    return res;
  } catch (error) {
    throw new Error('Error');
  }
};

const authService = {
  register,
  logout,
  login,
};

export default authService;
