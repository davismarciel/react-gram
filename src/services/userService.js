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

const updateProfile = async (data, token) => {
  const config = requestConfig('PUT', data, token, true);

  try {
    const res = await fetch(`${url}/users/`, config)
      .then((res) => res.json())
      .catch((err) => err);

    return res;
  } catch (error) {
    console.log(error);
  }
};

const getUserDetails = async (id) => {
  const config = requestConfig('GET');

  try {
    const res = await fetch(`${url}/users/${id}`, config)
      .then((res) => res.json())
      .catch((err) => err);
    return res;
  } catch (error) {
    console.log(error);
  }
};

const userService = {
  profile,
  updateProfile,
  getUserDetails,
};

export default userService;
