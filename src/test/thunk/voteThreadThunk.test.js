import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import {
  upVote,
  downVote,
  neutralizeVote,
} from '../../redux/features/voteThread/voteThreadThunk';

import * as voteThreadAPI from '../../utils/api/voteThreadAPI';

describe('voteTreads Thunk', () => {
  let dispatch;
  let getState;
  const userData = {
    threadId: 'thread-1',
  };
  const mockToken = 'example_token';

  beforeEach(() => {
    dispatch = vi.fn();
    getState = vi.fn();
  });

  afterEach(() => {
    dispatch.mockClear();
    getState.mockClear();
  });

  describe('upVote', () => {
    let upVoteMock;

    beforeEach(() => {
      upVoteMock = vi.spyOn(voteThreadAPI, 'upVoteThread');
    });

    afterEach(() => {
      upVoteMock.mockClear();
    });

    it('Should dispatch the correct actions on successful upVote', async () => {
      const mockResponse = {
        error: false,
        status: 'success',
        message: 'Up Vote Success',
        data: {
          id: 'vote-1',
          userId: 'users-1',
          threadId: 'thread-1',
          voteType: 1,
        },
      };

      upVoteMock.mockResolvedValueOnce(mockResponse);

      await upVote(userData, {
        headers: { Authorization: `Bearer ${mockToken}` },
      })(dispatch, getState);

      expect(dispatch).toHaveBeenCalledWith({
        type: 'voteThread/upVote/pending',
        meta: {
          arg: userData,
          requestId: expect.any(String),
          requestStatus: 'pending',
        },
      });

      expect(dispatch).toHaveBeenCalledWith({
        type: 'voteThread/upVote/fulfilled',
        payload: mockResponse,
        meta: {
          arg: userData,
          requestId: expect.any(String),
          requestStatus: 'fulfilled',
        },
      });
    });

    it('Should dispatch the correct actions on failed upVote', async () => {
      const mockResponse = {
        error: true,
        status: 'failed',
        message: 'Up Vote Failed',
        data: null,
      };

      upVoteMock.mockRejectedValueOnce(mockResponse);

      await upVote(userData, {
        headers: { Authorization: `Bearer ${mockToken}` },
      })(dispatch, getState);

      expect(dispatch).toHaveBeenCalledWith({
        type: 'voteThread/upVote/pending',
        meta: {
          arg: userData,
          requestId: expect.any(String),
          requestStatus: 'pending',
        },
      });

      expect(dispatch).toHaveBeenCalledWith({
        type: 'voteThread/upVote/rejected',
        error: {
          message: mockResponse.message,
        },
        meta: {
          aborted: false,
          arg: userData,
          requestId: expect.any(String),
          requestStatus: 'rejected',
          condition: false,
          rejectedWithValue: false,
        },
      });
    });
  });

  describe('downVote', () => {
    let downVoteMock;

    beforeEach(() => {
      downVoteMock = vi.spyOn(voteThreadAPI, 'downVoteThread');
    });

    afterEach(() => {
      downVoteMock.mockClear();
    });

    it('Should dispatch the correct actions on successful downVote', async () => {
      const mockResponse = {
        error: false,
        status: 'success',
        message: 'Down Vote Success',
        data: {
          id: 'vote-1',
          userId: 'users-1',
          threadId: 'thread-1',
          voteType: -1,
        },
      };

      downVoteMock.mockResolvedValueOnce(mockResponse);

      await downVote(userData, {
        headers: { Authorization: `Bearer ${mockToken}` },
      })(dispatch, getState);

      expect(dispatch).toHaveBeenCalledWith({
        type: 'voteThread/downVote/pending',
        meta: {
          arg: userData,
          requestId: expect.any(String),
          requestStatus: 'pending',
        },
      });

      expect(dispatch).toHaveBeenCalledWith({
        type: 'voteThread/downVote/fulfilled',
        payload: mockResponse,
        meta: {
          arg: userData,
          requestId: expect.any(String),
          requestStatus: 'fulfilled',
        },
      });
    });

    it('Should dispatch the correct actions on failed downVote', async () => {
      const mockResponse = {
        error: true,
        status: 'failed',
        message: 'Down Vote Failed',
        data: null,
      };

      downVoteMock.mockRejectedValueOnce(mockResponse);

      await downVote(userData, {
        headers: { Authorization: `Bearer ${mockToken}` },
      })(dispatch, getState);

      expect(dispatch).toHaveBeenCalledWith({
        type: 'voteThread/downVote/pending',
        meta: {
          arg: userData,
          requestId: expect.any(String),
          requestStatus: 'pending',
        },
      });

      expect(dispatch).toHaveBeenCalledWith({
        type: 'voteThread/downVote/rejected',
        error: {
          message: mockResponse.message,
        },
        meta: {
          aborted: false,
          arg: userData,
          requestId: expect.any(String),
          requestStatus: 'rejected',
          condition: false,
          rejectedWithValue: false,
        },
      });
    });
  });

  describe('neutralizeVote', () => {
    let neutralizeVoteMock;

    beforeEach(() => {
      neutralizeVoteMock = vi.spyOn(voteThreadAPI, 'neutralizeVoteThread');
    });

    afterEach(() => {
      neutralizeVoteMock.mockClear();
    });

    it('Should dispatch the correct actions on successful neutralizeVote', async () => {
      const mockResponse = {
        error: false,
        status: 'success',
        message: 'Neutralize Vote Success',
        data: {
          id: 'vote-1',
          userId: 'users-1',
          threadId: 'thread-1',
          voteType: 0,
        },
      };

      neutralizeVoteMock.mockResolvedValueOnce(mockResponse);

      await neutralizeVote(userData, {
        headers: { Authorization: `Bearer ${mockToken}` },
      })(dispatch, getState);

      expect(dispatch).toHaveBeenCalledWith({
        type: 'voteThread/neutralize/pending',
        meta: {
          arg: userData,
          requestId: expect.any(String),
          requestStatus: 'pending',
        },
      });

      expect(dispatch).toHaveBeenCalledWith({
        type: 'voteThread/neutralize/fulfilled',
        payload: mockResponse,
        meta: {
          arg: userData,
          requestId: expect.any(String),
          requestStatus: 'fulfilled',
        },
      });
    });

    it('Should dispatch the correct actions on failed neutralizeVote', async () => {
      const mockResponse = {
        error: true,
        status: 'failed',
        message: 'Neutralize Vote Failed',
        data: null,
      };

      neutralizeVoteMock.mockRejectedValueOnce(mockResponse);

      await neutralizeVote(userData, {
        headers: { Authorization: `Bearer ${mockToken}` },
      })(dispatch, getState);

      expect(dispatch).toHaveBeenCalledWith({
        type: 'voteThread/neutralize/pending',
        meta: {
          arg: userData,
          requestId: expect.any(String),
          requestStatus: 'pending',
        },
      });

      expect(dispatch).toHaveBeenCalledWith({
        type: 'voteThread/neutralize/rejected',
        error: {
          message: mockResponse.message,
        },
        meta: {
          aborted: false,
          arg: userData,
          requestId: expect.any(String),
          requestStatus: 'rejected',
          condition: false,
          rejectedWithValue: false,
        },
      });
    });
  });
});
