import { url, requestConfig } from '../utils/config';

const profile = async (data, token) => {
  const config = requestConfig('GET', data, token);

  try {
    const res = await fetch(`${url}/users/profile`, config)
      .then((res) => res.json())
      .catch((err) => err);

    return res;
  } catch (error) {
    console.log(error);
  }
};

const userService = {
  profile,
};

export default userService;
