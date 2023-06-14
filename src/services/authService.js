import { url, requestConfig } from '../utils/config';

// Register an user
const register = async (data) => {
  const config = requestConfig('POST', data);

  try {
    // eslint-disable-next-line prefer-template
    const res = await fetch(url + '/users/register', config)
      .then((res) => res.json())
      .catch((err) => err);

    if (res) {
      localStorage.setItem('user', JSON.stringify(res));
    }
  } catch (error) {
    console.log(error);
  }
};

const authService = {
  register,
};

export default authService;
