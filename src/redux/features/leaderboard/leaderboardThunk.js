import { createAsyncThunk } from '@reduxjs/toolkit';
import { getLeaderboards } from '../../../utils/api/leaderboardAPI';

const getAllLeaderboard = createAsyncThunk(
  'leaderboard/getAllLeaderboard',
  async () => {
    const response = await getLeaderboards();
    return response;
  }
);

export default getAllLeaderboard;
