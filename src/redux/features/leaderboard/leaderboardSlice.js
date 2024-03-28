import { createSlice } from '@reduxjs/toolkit';
import getAllLeaderboard from './leaderboardThunk';

const leaderboardSlice = createSlice({
  name: 'leaderboard',
  initialState: {
    listBoard: null,
    message: null,
    isError: false,
    isLoading: false,
    // highScore: 0,
    // isHighScoreLoading: false,
    highScore: {
      value: 0,
      isHighScoreLoading: true,
    },
    // totalScore: 0,
    // isTotalScoreLoading: false,
    totalScore: {
      value: 0,
      isTotalScoreLoading: true,
    },
    // totalUsers: 0,
    // isTotalUsersLoading: false,
    totalUsers: {
      value: 0,
      isTotalUsersLoading: true,
    },
  },
  reducers: {
    countHighScore: (state) => {
      if (state.listBoard) {
        state.highScore.value = state.listBoard[0].score;
        state.highScore.isHighScoreLoading = false;
      } else {
        state.highScore.value = 0;
        state.highScore.isHighScoreLoading = true;
      }
    },
    countTotalScore: (state) => {
      if (state.listBoard) {
        state.totalScore.value = state.listBoard.reduce(
          (total, current) => total + current.score,
          0
        );
        state.totalScore.isTotalScoreLoading = false;
      } else {
        state.totalScore.value = 0;
        state.totalScore.isTotalScoreLoading = true;
      }
    },
    countTotalUsers: (state) => {
      if (state.listBoard) {
        state.totalUsers.value = state.listBoard.length;
        state.totalUsers.isTotalUsersLoading = false;
      } else {
        state.totalUsers.value = 0;
        state.totalUsers.isTotalUsersLoading = true;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllLeaderboard.pending, (state) => {
        state.isError = false;
        state.isLoading = true;
        state.message = null;
      })
      .addCase(getAllLeaderboard.fulfilled, (state, action) => {
        state.isError = action.payload.error;
        state.isLoading = false;
        state.message = action.payload.message;
        if (action.payload.data) {
          state.listBoard = action.payload.data;
        }
      })
      .addCase(getAllLeaderboard.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.message = action.error.message;
      });
  },
});

export const { countHighScore, countTotalScore, countTotalUsers } =
  leaderboardSlice.actions;
export default leaderboardSlice.reducer;
