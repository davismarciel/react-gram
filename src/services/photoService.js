import { url, requestConfig } from '../utils/config';

// Publish an user photo
const publishPhoto = async (data, token) => {
  const config = requestConfig('POST', data, token);

  try {
    const res = await fetch(`${url}/photos`, config)
      .then((res) => res.json())
      .catch((err) => err);

    return res;
  } catch (error) {
    console.log(error);
  }
};

const photoService = {
  publishPhoto,
};

export default photoService;
