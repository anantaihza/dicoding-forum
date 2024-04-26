import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import getAllLeaderboard from '../../redux/features/leaderboard/leaderboardThunk';

import * as leaderboardAPI from '../../utils/api/leaderboardAPI';

/**
 *
 * SKENARIO TESTING
 *
 * Thunk: leaderboardThunk
 *
 * - Should dispatch the correct actions on successful get leaderboard
 * - Should dispatch the correct actions on failed get leaderboard
 *
 */
describe('Leaderboard Thunk', () => {
  let dispatch;
  let getState;
  let getLeaderboardMock;
  const mockResponse = {
    error: false,
    status: 'success',
    message: 'Get Leaderboard Success',
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
  };
  const mockResponseFail = {
    error: true,
    status: 'Failed',
    message: 'Unable to get leaderboard',
    data: null,
  };

  beforeEach(() => {
    dispatch = vi.fn();
    getState = vi.fn();
    getLeaderboardMock = vi.spyOn(leaderboardAPI, 'getLeaderboards');
  });

  afterEach(() => {
    dispatch.mockClear();
    getState.mockClear();
    getLeaderboardMock.mockClear();
  });

  it('Should dispatch the correct actions on successful get leaderboard', async () => {
    // Arrange
    getLeaderboardMock.mockResolvedValueOnce(mockResponse);

    // Action
    await getAllLeaderboard()(dispatch, getState);

    // Assert
    expect(dispatch).toHaveBeenCalledWith({
      type: 'leaderboard/getAllLeaderboard/pending',
      meta: {
        requestId: expect.any(String),
        requestStatus: 'pending',
      },
    });

    expect(dispatch).toHaveBeenCalledWith({
      type: 'leaderboard/getAllLeaderboard/fulfilled',
      payload: mockResponse,
      meta: {
        requestId: expect.any(String),
        requestStatus: 'fulfilled',
      },
    });
  });

  it('Should dispatch the correct actions on failed get leaderboard', async () => {
    // Arrange
    getLeaderboardMock.mockRejectedValueOnce(mockResponseFail);

    // Action
    await getAllLeaderboard()(dispatch, getState);

    // Assert
    expect(dispatch).toHaveBeenCalledWith({
      type: 'leaderboard/getAllLeaderboard/pending',
      meta: {
        requestId: expect.any(String),
        requestStatus: 'pending',
      },
    });

    expect(dispatch).toHaveBeenCalledWith({
      type: 'leaderboard/getAllLeaderboard/rejected',
      error: {
        message: mockResponseFail.message,
      },
      meta: {
        aborted: false,
        condition: false,
        rejectedWithValue: false,
        requestId: expect.any(String),
        requestStatus: 'rejected',
      },
    });
  });
});
