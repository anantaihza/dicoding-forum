import API_URL from './urlAPI';
import { fetchWithToken } from './userAPI';

const BASE_URL = API_URL;

const getAllThread = async () => {
  try {
    const response = await fetch(`${BASE_URL}/threads`);
    const responseJson = await response.json();

    if (responseJson.status === 'success') {
      return {
        error: false,
        status: responseJson.status,
        message: responseJson.message,
        data: responseJson.data.threads,
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

const getDetailThread = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}/threads/${id}`);
    const responseJson = response.json();

    if (responseJson.status === 'success') {
      return {
        error: false,
        status: responseJson.status,
        message: responseJson.message,
        data: responseJson.data.detailThread,
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

const createThread = async ({ title, body, category }) => {
  try {
    const response = await fetchWithToken(`${BASE_URL}/threads`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title,
        body,
        category,
      }),
    });
    const responseJson = await response.json();

    if (responseJson.statur === 'success') {
      return {
        error: false,
        status: responseJson.status,
        message: responseJson.message,
        data: responseJson.data.thread,
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

export { getAllThread, getDetailThread, createThread };
