const BASE_URL = 'https://forum-api.dicoding.dev/v1';

const getAccessToken = () => localStorage.getItem('accessToken');

const putAccessToken = (token) => localStorage.setItem('accessToken', token);

const removeAccessToken = () => localStorage.removeItem('accessToken');

const fetchWithToken = async (url, options = {}) =>
  fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      Authorization: `Bearer ${getAccessToken()}`,
    },
  });

const register = async ({ name, email, password }) => {
  try {
    const response = await fetch(`${BASE_URL}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    });

    const responseJson = await response.json();
    if (responseJson.status !== 'success') {
      // alert(responseJson.message);
      return {
        error: true,
        status: responseJson.status,
        message: responseJson.message,
      };
    }
    return {
      error: false,
      status: responseJson.status,
      message: responseJson.message,
      data: responseJson.data,
    };
  } catch (error) {
    return { error: true, status: error.status, message: error.message };
  }
};

const login = async ({ email, password }) => {
  try {
    const response = await fetch(`${BASE_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const responseJson = await response.json();

    if (responseJson.status !== 'success') {
      return {
        error: true,
        status: responseJson.status,
        message: responseJson.message,
        data: null,
      };
    }

    return {
      error: false,
      status: responseJson.status,
      message: responseJson.message,
      data: responseJson.data,
    };
  } catch (error) {
    return {
      error: true,
      status: error.status,
      message: error.message,
    };
  }
};

// TODO: get user profile, perbaiki lagi
const getUserProfile = async () => {
  try {
    const response = await fetchWithToken(`${BASE_URL}/users/me`);
    const responseJson = await response.json();

    if (responseJson.status !== 'success') {
      return {
        error: true,
        status: responseJson.status,
        message: responseJson.message,
        data: null,
      };
    }

    return {
      error: false,
      status: responseJson.status,
      message: responseJson.message,
      data: responseJson.data,
    };
  } catch (error) {
    return { error: true, status: error.status, message: error.message };
  }
};

export {
  getAccessToken,
  putAccessToken,
  removeAccessToken,
  register,
  login,
  getUserProfile,
};
