import {API_URL} from 'react-native-dotenv';

export const authRequest = async (END_POINT, method, data) => {
  const headers = {
    'Content-Type': 'application/json',
  };

  let options;

  if (data !== undefined && Object?.keys(data)?.length > 0) {
    const body = JSON.stringify(data);

    options = {
      method,
      headers,
      body,
    };
  } else {
    options = {
      method,
      headers,
    };
  }

  try {
    const response = await fetch(`${API_URL}/api/v1/${END_POINT}`, options);
    return response.json();
  } catch (err) {
    console.log('API ERROR', err.message);
  }
};

export const request = async (END_POINT, auth, method, data) => {
  console.log('AUTH', auth);
  console.log('AUTH', data);
  const headers = {
    'Content-Type': 'application/json',
    Authorization: auth,
  };

  let options;

  if (data) {
    const body = JSON.stringify(data);

    console.log(body);

    options = {
      method,
      headers,
      body,
    };
  } else {
    options = {
      method,
      headers,
    };
  }

  try {
    const response = await fetch(`${API_URL}/api/v1/${END_POINT}`, options);
    console.log('FROM SERVER ======>', response);
    return response;
  } catch (err) {
    console.log('API ERROR', err);
  }
};

export const requestWithUploads = async (END_POINT, auth, method, data) => {
  console.log('BODY ==========>', data);

  const headers = auth
    ? {
        'Content-Type': 'multipart/form-data',
        Authorization: auth,
      }
    : {'Content-Type': 'multipart/form-data'};

  const body = data;

  const options = {
    method,
    headers,
    body,
  };

  try {
    const response = await fetch(`${API_URL}/api/v1/${END_POINT}`, options);
    console.log('RESPONSE ==========>', response);
    return response;
  } catch (err) {
    console.log('API ERROR', err);
  }
};
