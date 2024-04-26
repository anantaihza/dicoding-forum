import { expect, it, describe } from 'vitest';
import leaderboardReducer from '../../redux/features/leaderboard/leaderboardSlice';
import getAllLeaderboard from '../../redux/features/leaderboard/leaderboardThunk';

/**
 *
 * SKENARIO TESTING
 *
 * Extra Reducer: leaderboardReducer
 *
 * 1. getAllLeaderboard
 *    - Pending: Should return {isLoading = true, isError = false, message = null, listBoard = null}
 *    - Fulfilled(success): Should return {isLoading = false, isError = false, message = success, listBoard = all leaderboard}
 *    - Fulfilled(error): Should return {isLoading = false, isError = true, message = error, listBoard = null}
 *    - Rejected: Should return {isLoading = false, isError = true, message = error, listBoard = null}
 *
 */
describe('Leaderboard reducer test', () => {
  const initialState = {
    listBoard: null,
    message: null,
    isError: false,
    isLoading: false,
    highScore: {
      value: 0,
      isHighScoreLoading: true,
    },
    totalScore: {
      value: 0,
      isTotalScoreLoading: true,
    },
    totalUsers: {
      value: 0,
      isTotalUsersLoading: true,
    },
  };

  describe('getAllLeaderboard', () => {
    it('Pending: Should return {isLoading = true, isError = false, message = null, listBoard = null}', () => {
      // Arrange
      const state = initialState;
      const action = getAllLeaderboard.pending;

      // Action
      const nextState = leaderboardReducer(state, action);

      // Assert
      expect(nextState).toEqual({
        listBoard: null,
        message: null,
        isError: false,
        isLoading: true,
        highScore: {
          value: 0,
          isHighScoreLoading: true,
        },
        totalScore: {
          value: 0,
          isTotalScoreLoading: true,
        },
        totalUsers: {
          value: 0,
          isTotalUsersLoading: true,
        },
      });
    });

    it('Fulfilled(success): Should return {isLoading = false, isError = false, message = success, listBoard = all leaderboard}', () => {
      // Arrange
      const state = initialState;
      const action = getAllLeaderboard.fulfilled({
        error: false,
        message: 'success',
        isLoading: false,
        data: [
          {
            user: {
              id: 'users-1',
              name: 'John Doe',
              email: 'john@example.com',
              avatar: 'https://generated-image-url.jpg',
            },
            score: 10,
          },
          {
            user: {
              id: 'users-2',
              name: 'Jane Doe',
              email: 'jane@example.com',
              avatar: 'https://generated-image-url.jpg',
            },
            score: 5,
          },
        ],
      });

      // Action
      const nextState = leaderboardReducer(state, action);

      // Assert
      expect(nextState).toEqual({
        listBoard: [
          {
            user: {
              id: 'users-1',
              name: 'John Doe',
              email: 'john@example.com',
              avatar: 'https://generated-image-url.jpg',
            },
            score: 10,
          },
          {
            user: {
              id: 'users-2',
              name: 'Jane Doe',
              email: 'jane@example.com',
              avatar: 'https://generated-image-url.jpg',
            },
            score: 5,
          },
        ],
        message: 'success',
        isError: false,
        isLoading: false,
        highScore: {
          value: 0,
          isHighScoreLoading: true,
        },
        totalScore: {
          value: 0,
          isTotalScoreLoading: true,
        },
        totalUsers: {
          value: 0,
          isTotalUsersLoading: true,
        },
      });
    });

    it('Fulfilled(error): Should return {isLoading = false, isError = true, message = error, listBoard = null}', () => {
      // Arrange
      const state = initialState;
      const action = getAllLeaderboard.fulfilled({
        error: true,
        message: 'error',
        isLoading: false,
        data: null,
      });

      // Action
      const nextState = leaderboardReducer(state, action);

      // Assert
      expect(nextState).toEqual({
        listBoard: null,
        message: 'error',
        isError: true,
        isLoading: false,
        highScore: {
          value: 0,
          isHighScoreLoading: true,
        },
        totalScore: {
          value: 0,
          isTotalScoreLoading: true,
        },
        totalUsers: {
          value: 0,
          isTotalUsersLoading: true,
        },
      });
    });

    it('Rejected: Should return {isLoading = false, isError = true, message = error, listBoard = null}', () => {
      // Arrange
      const state = initialState;
      const action = getAllLeaderboard.rejected({
        error: true,
        message: 'error',
        isLoading: false,
        data: null,
      });

      // Action
      const nextState = leaderboardReducer(state, action);

      // Assert
      expect(nextState).toEqual({
        listBoard: null,
        message: 'error',
        isError: true,
        isLoading: false,
        highScore: {
          value: 0,
          isHighScoreLoading: true,
        },
        totalScore: {
          value: 0,
          isTotalScoreLoading: true,
        },
        totalUsers: {
          value: 0,
          isTotalUsersLoading: true,
        },
      });
    });
  });
});
