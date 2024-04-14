import { expect, it, describe, beforeEach } from 'vitest';
import leaderboardReducer, {
  countHighScore,
  countTotalScore,
  countTotalUsers,
} from '../../redux/features/leaderboard/leaderboardSlice';

describe('Leaderboard reducers test', () => {
  let initialState;

  beforeEach(() => {
    initialState = {
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
  });

  it('Should return the initial state when no action', () => {
    // Arrange
    const state = undefined;
    const action = {};

    // Action
    const nextState = leaderboardReducer(state, action);

    // Assert
    expect(nextState).toEqual(initialState);
  });

  describe('Count High Score', () => {
    it('Should return 0 when listboard is null', () => {
      // Arrange
      const newHighScore = 100;
      const action = countHighScore(newHighScore);

      // Action
      const nextState = leaderboardReducer(initialState, action);

      // Assert
      expect(nextState.highScore.value).toEqual(0);
      expect(nextState.highScore.isHighScoreLoading).toEqual(true);
    });

    it('Should return new high score', () => {
      // Arrange
      initialState.listBoard = [
        {
          user: {
            id: 'users-1',
            name: 'John Doe',
            email: 'john@example.com',
            avatar: 'https://generated-image-url.jpg',
          },
          score: 10,
        },
      ];
      const newHighScore = initialState.listBoard[0].score;
      const action = countHighScore(newHighScore);

      // Action
      const nextState = leaderboardReducer(initialState, action);

      // Assert
      expect(nextState.highScore.value).toEqual(newHighScore);
      expect(nextState.highScore.isHighScoreLoading).toEqual(false);
    });
  });

  describe('Count Total Score', () => {
    it('Should return 0 when listboard is null', () => {
      // Arrange
      const newTotalScore = 100;
      const action = countTotalScore(newTotalScore);

      // Action
      const nextState = leaderboardReducer(initialState, action);

      // Assert
      expect(nextState.totalScore.value).toEqual(0);
      expect(nextState.totalScore.isTotalScoreLoading).toEqual(true);
    });

    it('Should return new total score', () => {
      // Arrange
      initialState.listBoard = [
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
            name: 'John Dus',
            email: 'john@example.com',
            avatar: 'https://generated-image-url.jpg',
          },
          score: 10,
        },
      ];
      const newTotalScore = initialState.listBoard.reduce(
        (total, current) => total + current.score,
        0
      );
      const action = countTotalScore(newTotalScore);

      // Action
      const nextState = leaderboardReducer(initialState, action);

      // Assert
      expect(nextState.totalScore.value).toEqual(newTotalScore);
      expect(nextState.totalScore.isTotalScoreLoading).toEqual(false);
    });
  });

  describe('Count Total Users', () => {
    it('Should return 0 when listboard is null', () => {
      // Arrange
      const newTotalUsers = 100;
      const action = countTotalUsers(newTotalUsers);

      // Action
      const nextState = leaderboardReducer(initialState, action);

      // Assert
      expect(nextState.totalUsers.value).toEqual(0);
      expect(nextState.totalUsers.isTotalUsersLoading).toEqual(true);
    });

    it('Should return new total users', () => {
      // Arrange
      initialState.listBoard = [
        {
          user: {
            id: 'users-1',
            name: 'John Doe',
            email: 'john@example.com',
            avatar: 'https://generated-image-url.jpg',
          },
          score: 10,
        },
      ];
      const newTotalUsers = initialState.listBoard.length;
      const action = countTotalUsers(newTotalUsers);

      // Action
      const nextState = leaderboardReducer(initialState, action);

      // Assert
      expect(nextState.totalUsers.value).toEqual(newTotalUsers);
    });
  });
});
