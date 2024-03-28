import URL_API from './urlAPI';
import { fetchWithToken } from './userAPI';

const BASE_URL = URL_API;

const upVoteComment = async ({ threadId, commentId }) => {
  try {
    const response = await fetchWithToken(
      `${BASE_URL}/threads/${threadId}/comments/${commentId}/up-vote`,
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

const downVoteComment = async ({ threadId, commentId }) => {
  try {
    const response = await fetchWithToken(
      `${BASE_URL}/threads/${threadId}/comments/${commentId}/down-vote`,
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

const neutralizeVoteComment = async ({ threadId, commentId }) => {
  try {
    const response = await fetchWithToken(
      `${BASE_URL}/threads/${threadId}/comments/${commentId}/neutral-vote`,
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

export { upVoteComment, downVoteComment, neutralizeVoteComment };
