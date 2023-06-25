import { url, requestConfig } from '../utils/config';

// Publish an user photo
const publishPhoto = async (data, token) => {
  const config = requestConfig('POST', data, token, true);

  try {
    const res = await fetch(`${url}/photos`, config)
      .then((res) => res.json())
      .catch((err) => err);

    return res;
  } catch (error) {
    throw new Error('Error');
  }
};

// Get user photos
const getUserPhotos = async (id, token) => {
  const config = requestConfig('GET', null, token);

  try {
    const res = await fetch(`${url}/photos/user/${id}`, config)
      .then((res) => res.json())
      .catch((err) => err);

    return res;
  } catch (error) {
    throw new Error('Error');
  }
};

// Delete user photos
const deletePhoto = async (id, token) => {
  const config = requestConfig('DELETE', null, token);

  try {
    const res = await fetch(`${url}/photos/${id}`, config)
      .then((res) => res.json())
      .catch((err) => err);

    return res;
  } catch (error) {
    throw new Error('Error');
  }
};

// Edit user photos
const updatePhoto = async (data, id, token) => {
  const config = requestConfig('PUT', data, token);

  try {
    const res = await fetch(`${url}/photos/${id}`, config)
      .then((res) => res.json())
      .catch((err) => err);

    return res;
  } catch (error) {
    throw new Error('Error');
  }
};

// Get a photo by id
const getPhoto = async (id, token) => {
  const config = requestConfig('GET', null, token);

  try {
    const res = await fetch(`${url}/photos/${id}`, config)
      .then((res) => res.json())
      .catch((err) => err);

    return res;
  } catch (error) {
    throw new Error('Error');
  }
};

const like = async (id, token) => {
  const config = requestConfig('PUT', null, token);

  try {
    const res = await fetch(`${url}/photos/like/${id}`, config)
      .then((res) => res.json())
      .catch((err) => err);

    return res;
  } catch (error) {
    throw new Error('Error');
  }
};

const comment = async (data, id, token) => {
  const config = requestConfig('PUT', data, token);

  try {
    const res = await fetch(`${url}/photos/comment/${id}`, config)
      .then((res) => res.json())
      .catch((err) => err);

    return res;
  } catch (error) {
    throw new Error('Error');
  }
};

const getPhotos = async () => {
  const config = requestConfig('GET');
  try {
    const res = await fetch(`${url}/photos`, config)
      .then((res) => res.json())
      .catch((err) => err);

    return res;
  } catch (error) {
    throw new Error('Error');
  }
};

const searchPhotos = async (query, token) => {
  const config = requestConfig('GET', null, token);

  try {
    const res = await fetch(`${url}/photos/search?q=${query}`, config)
      .then((res) => res.json())
      .catch((err) => err);

    return res;
  } catch (error) {
    throw new Error('Error');
  }
};

const photoService = {
  publishPhoto,
  getUserPhotos,
  deletePhoto,
  updatePhoto,
  getPhoto,
  like,
  comment,
  getPhotos,
  searchPhotos,
};

export default photoService;
