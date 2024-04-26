import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import {
  getThreads,
  getThreadDetail,
  addThread,
} from '../../redux/features/threads/threadsThunk';

import * as threadAPI from '../../utils/api/threadAPI';

/**
 *
 * SKENARIO TESTING
 *
 * Thunk: threadsThunk
 *
 * 1. Get Threads
 *    - Should dispatch the correct actions on successful get threads
 *    - Should dispatch the correct actions on failed get threads
 *
 * 2. Get Thread Detail
 *    - Should dispatch the correct actions on successful get thread detail
 *    - Should dispatch the correct actions on failed get thread detail
 *
 * 3. Add Thread
 *    - Should dispatch the correct actions on successful add thread
 *    - Should dispatch the correct actions on failed add thread
 *
 */
describe('Thread Thunk', () => {
  let dispatch;
  let getState;

  beforeEach(() => {
    dispatch = vi.fn();
    getState = vi.fn();
  });

  afterEach(() => {
    dispatch.mockClear();
    getState.mockClear();
  });

  describe('getThreads', () => {
    let getThreadsMock;

    beforeEach(() => {
      getThreadsMock = vi.spyOn(threadAPI, 'getAllThread');
    });

    afterEach(() => {
      getThreadsMock.mockClear();
    });

    it('Should dispatch the correct actions on successful get threads', async () => {
      // Arrange
      const mockResponse = {
        error: false,
        status: 'success',
        message: 'Get Threads Success',
        data: [
          {
            id: 'thread-1',
            title: 'Thread Pertama',
            body: 'Ini adalah thread pertama',
            category: 'General',
            createdAt: '2021-06-21T07:00:00.000Z',
            ownerId: 'users-1',
            upVotesBy: [],
            downVotesBy: [],
            totalComments: 0,
          },
          {
            id: 'thread-2',
            title: 'Thread Kedua',
            body: 'Ini adalah thread kedua',
            category: 'General',
            createdAt: '2021-06-21T07:00:00.000Z',
            ownerId: 'users-2',
            upVotesBy: [],
            downVotesBy: [],
            totalComments: 0,
          },
        ],
      };

      getThreadsMock.mockResolvedValueOnce(mockResponse);

      // Action
      await getThreads()(dispatch, getState);

      // Assert
      expect(dispatch).toHaveBeenCalledWith({
        type: 'threads/getThread/pending',
        meta: {
          requestId: expect.any(String),
          requestStatus: 'pending',
        },
      });

      expect(dispatch).toHaveBeenCalledWith({
        type: 'threads/getThread/fulfilled',
        payload: mockResponse,
        meta: {
          requestId: expect.any(String),
          requestStatus: 'fulfilled',
        },
      });
    });

    it('Should dispatch the correct actions on failed get threads', async () => {
      // Arrange
      const mockResponse = {
        error: true,
        status: 'failed',
        message: 'Get Threads Failed',
        data: null,
      };

      getThreadsMock.mockRejectedValueOnce(mockResponse);

      // Action
      await getThreads()(dispatch, getState);

      // Assert
      expect(dispatch).toHaveBeenCalledWith({
        type: 'threads/getThread/pending',
        meta: {
          requestId: expect.any(String),
          requestStatus: 'pending',
        },
      });

      expect(dispatch).toHaveBeenCalledWith({
        type: 'threads/getThread/rejected',
        error: {
          message: mockResponse.message,
        },
        meta: {
          aborted: false,
          requestId: expect.any(String),
          requestStatus: 'rejected',
          condition: false,
          rejectedWithValue: false,
        },
      });
    });
  });

  describe('getThreadDetail', () => {
    let getThreadDetailMock;

    beforeEach(() => {
      getThreadDetailMock = vi.spyOn(threadAPI, 'getDetailThread');
    });

    afterEach(() => {
      getThreadDetailMock.mockClear();
    });

    it('Should dispatch the correct actions on successful get thread detail', async () => {
      // Arrange
      const mockResponse = {
        error: false,
        status: 'success',
        message: 'Get Thread Detail Success',
        data: {
          id: 'thread-1',
          title: 'Thread Pertama',
          body: 'Ini adalah thread pertama',
          category: 'General',
          createdAt: '2021-06-21T07:00:00.000Z',
          owner: {
            id: 'users-1',
            name: 'John Doe',
            avatar: 'https://generated-image-url.jpg',
          },
          upVotesBy: [],
          downVotesBy: [],
          comments: [
            {
              id: 'comment-1',
              content: 'Ini adalah komentar pertama',
              createdAt: '2021-06-21T07:00:00.000Z',
              owner: {
                id: 'users-1',
                name: 'John Doe',
                avatar: 'https://generated-image-url.jpg',
              },
              upVotesBy: [],
              downVotesBy: [],
            },
          ],
        },
      };

      getThreadDetailMock.mockResolvedValueOnce(mockResponse);

      // Action
      await getThreadDetail('thread-1')(dispatch, getState);

      // Assert
      expect(dispatch).toHaveBeenCalledWith({
        type: 'threads/getThreadDetail/pending',
        meta: {
          arg: mockResponse.data.id,
          requestId: expect.any(String),
          requestStatus: 'pending',
        },
      });

      expect(dispatch).toHaveBeenCalledWith({
        type: 'threads/getThreadDetail/fulfilled',
        payload: mockResponse,
        meta: {
          arg: mockResponse.data.id,
          requestId: expect.any(String),
          requestStatus: 'fulfilled',
        },
      });
    });

    it('Should dispatch the correct actions on failed get thread detail', async () => {
      // Arrange
      const mockResponse = {
        error: true,
        status: 'failed',
        message: 'Get Thread Detail Failed',
        data: null,
      };

      getThreadDetailMock.mockRejectedValueOnce(mockResponse);

      // Action
      await getThreadDetail('thread-1')(dispatch, getState);

      // Assert
      expect(dispatch).toHaveBeenCalledWith({
        type: 'threads/getThreadDetail/pending',
        meta: {
          arg: 'thread-1',
          requestId: expect.any(String),
          requestStatus: 'pending',
        },
      });

      expect(dispatch).toHaveBeenCalledWith({
        type: 'threads/getThreadDetail/rejected',
        error: {
          message: mockResponse.message,
        },
        meta: {
          aborted: false,
          arg: 'thread-1',
          requestId: expect.any(String),
          requestStatus: 'rejected',
          condition: false,
          rejectedWithValue: false,
        },
      });
    });
  });

  describe('addThread', () => {
    let addThreadMock;
    const userData = {
      title: 'Thread Pertama',
      body: 'Ini adalah thread pertama',
      category: 'General',
    };
    const mockToken = 'example_token';

    beforeEach(() => {
      addThreadMock = vi.spyOn(threadAPI, 'createThread');
    });

    afterEach(() => {
      addThreadMock.mockClear();
    });

    it('Should dispatch the correct actions on successful add thread', async () => {
      // Arrange
      const mockResponse = {
        error: false,
        status: 'success',
        message: 'Add Thread Success',
        data: {
          id: 'thread-1',
          title: 'Thread Pertama',
          body: 'Ini adalah thread pertama',
          category: 'General',
          createdAt: '2021-06-21T07:00:00.000Z',
          ownerId: 'users-1',
          upVotesBy: [],
          downVotesBy: [],
          totalComments: 0,
        },
      };

      addThreadMock.mockResolvedValueOnce(mockResponse);

      // Action
      await addThread(userData, {
        headers: { Authorization: `Bearer ${mockToken}` },
      })(dispatch, getState);

      // Assert
      expect(dispatch).toHaveBeenCalledWith({
        type: 'threads/addThread/pending',
        meta: {
          arg: userData,
          requestId: expect.any(String),
          requestStatus: 'pending',
        },
      });

      expect(dispatch).toHaveBeenCalledWith({
        type: 'threads/addThread/fulfilled',
        payload: mockResponse,
        meta: {
          arg: userData,
          requestId: expect.any(String),
          requestStatus: 'fulfilled',
        },
      });
    });

    it('Should dispatch the correct actions on failed add thread', async () => {
      // Arrange
      const mockResponse = {
        error: true,
        status: 'failed',
        message: 'Add Thread Failed',
        data: null,
      };

      addThreadMock.mockRejectedValueOnce(mockResponse);

      // Action
      await addThread(userData, {
        headers: { Authorization: `Bearer ${mockToken}` },
      })(dispatch, getState);

      // Assert
      expect(dispatch).toHaveBeenCalledWith({
        type: 'threads/addThread/pending',
        meta: {
          arg: userData,
          requestId: expect.any(String),
          requestStatus: 'pending',
        },
      });

      expect(dispatch).toHaveBeenCalledWith({
        type: 'threads/addThread/rejected',
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
