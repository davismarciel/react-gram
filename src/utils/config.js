export const url = 'https://immense-temple-46522-2b9ae8c44a90.herokuapp.com/api';
export const uploads = 'https://immense-temple-46522-2b9ae8c44a90.herokuapp.com/uploads';

export const requestConfig = (method, data, token = null, image = null) => {
  let config;

  if (image) {
    config = {
      method,
      body: data,
      headers: {},
    };
  } else if (method === 'DELETE' || data === null) {
    config = {
      method,
      headers: {},
    };
  } else {
    config = {
      method,
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    };
  }

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
};
