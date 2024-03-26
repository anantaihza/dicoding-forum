import API_URL from './urlAPI';

const BASE_URL = API_URL;

const getLeaderboards = async () => {
  try {
    const response = await fetch(`${BASE_URL}/leaderboards`);
    const responseJson = await response.json();

    if (responseJson.status === 'success') {
      return {
        error: false,
        status: responseJson.status,
        message: responseJson.message,
        data: responseJson.data.leaderboards,
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

export default getLeaderboards;
