import { createAsyncThunk } from '@reduxjs/toolkit';
import getLeaderboard from '../../../utils/api/leaderboardAPI';

const getAllLeaderboard = createAsyncThunk(
  'leaderboard/getAllLeaderboard',
  async () => {
    const response = await getLeaderboard();
    return response;
  }
);

export default getAllLeaderboard;
