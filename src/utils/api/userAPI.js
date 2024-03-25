import API_URL from './urlAPI';

const BASE_URL = API_URL;

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
    if (responseJson.status === 'success') {
      return {
        error: false,
        status: responseJson.status,
        message: responseJson.message,
        data: responseJson.data,
      };
    }
    return {
      error: true,
      status: responseJson.status,
      message: responseJson.message,
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

    if (responseJson.status === 'success') {
      return {
        error: false,
        status: responseJson.status,
        message: responseJson.message,
        data: responseJson.data,
      };
    }

    return {
      error: true,
      status: responseJson.status,
      message: responseJson.message,
      data: null,
    };
  } catch (error) {
    return {
      error: true,
      status: error.status,
      message: error.message,
    };
  }
};

const getUserProfile = async () => {
  try {
    const response = await fetchWithToken(`${BASE_URL}/users/me`);
    const responseJson = await response.json();

    if (responseJson.status === 'success') {
      return {
        error: false,
        status: responseJson.status,
        message: responseJson.message,
        data: responseJson.data.user,
      };
    }

    return {
      error: true,
      status: responseJson.status,
      message: responseJson.message,
      data: null,
    };
  } catch (error) {
    return {
      error: true,
      status: error.status,
      message: error.message,
      data: null,
    };
  }
};

const getAllUser = async () => {
  try {
    const response = await fetch(`${BASE_URL}/users`);
    const responseJson = await response.json();
    if (responseJson.status === 'success') {
      return {
        error: false,
        status: responseJson.status,
        message: responseJson.message,
        data: responseJson.data.users,
      };
    }
    return {
      error: true,
      status: responseJson.status,
      message: responseJson.message,
      data: null,
    };
  } catch (error) {
    return {
      error: true,
      status: error.status,
      message: error.message,
      data: null,
    };
  }
};

export {
  getAccessToken,
  putAccessToken,
  removeAccessToken,
  register,
  login,
  getUserProfile,
  fetchWithToken,
  getAllUser,
};
