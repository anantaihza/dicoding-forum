import { createSlice } from '@reduxjs/toolkit';
import getAllLeaderboard from './leaderboardThunk';

const leaderboardSlice = createSlice({
  name: 'leaderboard',
  initialState: {
    listBoard: null,
    message: null,
    isError: false,
    isLoading: false,
    highScore: 0,
    totalScore: 0,
    totalUsers: 0,
    isHighScoreLoading: false,
    isTotalScoreLoading: false,
    isTotalUsersLoading: false,
  },
  reducers: {
    countHighScore: (state) => {
      if (state.listBoard) {
        state.highScore = state.listBoard[0].score;
        state.isHighScoreLoading = false;
      } else {
        state.highScore = 0;
        state.isHighScoreLoading = true;
      }
    },
    countTotalScore: (state) => {
      if (state.listBoard) {
        state.totalScore = state.listBoard.reduce(
          (total, current) => total + current.score,
          0
        );
        state.isTotalScoreLoading = false;
      } else {
        state.totalScore = 0;
        state.isTotalScoreLoading = true;
      }
    },
    countTotalUsers: (state) => {
      if (state.listBoard) {
        state.totalUsers = state.listBoard.length;
        state.isTotalUsersLoading = false;
      } else {
        state.totalUsers = 0;
        state.isTotalUsersLoading = true;
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
