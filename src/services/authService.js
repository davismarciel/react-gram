import { url, requestConfig } from '../utils/config';

// Register an user
const register = async (data) => {
  const config = requestConfig('POST', data);

  try {
    const res = await fetch(`${url}/users/register`, config)
      .then((res) => res.json())
      .catch((err) => err);

    if (res) {
      localStorage.setItem('user', JSON.stringify(res));
    }
    return res;
  } catch (error) {
    console.log(error);
  }
};

const logout = async () => {
  localStorage.removeItem('user');
};

const authService = {
  register,
  logout,
};

export default authService;
