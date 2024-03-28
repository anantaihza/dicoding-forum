import URL_API from './urlAPI';
import { fetchWithToken } from './userAPI';

const BASE_URL = URL_API;

const upVoteThread = async (threadId) => {
  try {
    const response = await fetchWithToken(
      `${BASE_URL}/threads/${threadId}/up-vote`,
      { method: 'POST' }
    );
    const responseJson = await response.json();

    if (responseJson.status === 'success') {
      return {
        error: false,
        status: responseJson.status,
        message: responseJson.message,
        data: responseJson.data.vote,
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

const downVoteThread = async (threadId) => {
  try {
    const response = await fetchWithToken(
      `${BASE_URL}/threads/${threadId}/down-vote`,
      { method: 'POST' }
    );
    const responseJson = await response.json();

    if (responseJson.status === 'success') {
      return {
        error: false,
        status: responseJson.status,
        message: responseJson.message,
        data: responseJson.data.vote,
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

const neutralizeVoteThread = async (threadId) => {
  try {
    const response = await fetchWithToken(
      `${BASE_URL}/threads/${threadId}/neutral-vote`,
      { method: 'POST' }
    );
    const responseJson = await response.json();

    if (responseJson.status === 'success') {
      return {
        error: false,
        status: responseJson.status,
        message: responseJson.message,
        data: responseJson.data.vote,
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

export { upVoteThread, downVoteThread, neutralizeVoteThread };
