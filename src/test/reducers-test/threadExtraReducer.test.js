import { expect, it, describe } from 'vitest';
import {
  getThreads,
  getThreadDetail,
  addThread,
} from '../../redux/features/threads/threadsThunk';
import threadsReducer from '../../redux/features/threads/threadsSlice';

/**
 *
 * SKENARIO TESTING
 *
 * Extra Reducer: threadsReducer
 *
 * 1. getThreads
 *    - Pending: Should return {isLoading = true, isError = false and message null}
 *    - Fulfilled(success): Should return {isLoading, isError = false and message success, data = Threads forum}
 *    - Fulfilled(failed): Should return {isLoading = false, isError = true and message failed}
 *    - Rejected: Should return {isLoading = false, isError = true and message rejected}
 *
 * 2. getThreadDetail
 *    - Pending: Should return {isLoading = true, isError = false, message = null, dataDetail = null}
 *    - Fulfilled(success): Should return {isLoading, isError = false and message = success, dataDetail = Thread detail}
 *    - Fulfilled(failed): Should return {isLoading = false, isError = true and message = failed}
 *    - Rejected: Should return {isLoading = false, isError = true and message = rejected}
 *
 * 3. addThread
 *    - Pending: Should return {isLoading = true, isError = false, message = null, dataCreate = null}
 *    - Fulfilled(success): Should return {isLoading, isError = false and message = success, dataCreate = Thread created}
 *    - Fulfilled(failed): Should return {isLoading = false, isError = true and message = failed}
 *    - Rejected: Should return {isLoading = false, isError = true and message = rejected}
 *
 *
 */
describe('Thread extraReducers test', () => {
  const initialState = {
    datas: null,
    dataDetail: null,
    dataCreate: null,
    message: null,
    isError: false,
    isLoading: true,
  };

  describe('getThreads', () => {
    it('Pending: Should return {isLoading = true, isError = false and message null}', () => {
      // Arrange
      const state = initialState;
      const action = getThreads.pending;

      // Action
      const nextState = threadsReducer(state, action);

      // Assert
      expect(nextState).toEqual({
        datas: null,
        dataDetail: null,
        dataCreate: null,
        message: null,
        isError: false,
        isLoading: true,
      });
    });

    it('Fulfilled(success): Should return {isLoading, isError = false and message success, data = Threads forum}', () => {
      // Arrange
      const state = initialState;
      const action = getThreads.fulfilled({
        error: false,
        message: 'success',
        isLoading: false,
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
        ],
      });

      // Action
      const nextState = threadsReducer(state, action);

      // Assert
      expect(nextState).toEqual({
        datas: [
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
        ],
        dataDetail: null,
        dataCreate: null,
        message: 'success',
        isError: false,
        isLoading: false,
      });
    });

    it('Fulfilled(failed): Should return {isLoading = false, isError = true and message failed}', () => {
      // Arrange
      const state = initialState;
      const action = getThreads.fulfilled({
        error: true,
        message: 'failed',
        isLoading: false,
      });

      // Action
      const nextState = threadsReducer(state, action);

      // Assert
      expect(nextState).toEqual({
        datas: null,
        dataDetail: null,
        dataCreate: null,
        message: 'failed',
        isError: true,
        isLoading: false,
      });
    });

    it('Rejected: Should return {isLoading = false, isError = true and message rejected}', () => {
      // Arrange
      const state = initialState;
      const action = getThreads.rejected({
        error: true,
        message: 'rejected',
        isLoading: false,
      });

      // Action
      const nextState = threadsReducer(state, action);

      // Assert
      expect(nextState).toEqual({
        datas: null,
        dataDetail: null,
        dataCreate: null,
        message: 'rejected',
        isError: true,
        isLoading: false,
      });
    });
  });

  describe('getThreadDetail', () => {
    it('Pending: Should return {isLoading = true, isError = false, message = null, dataDetail = null}', () => {
      // Arrange
      const state = initialState;
      const action = getThreadDetail.pending;

      // Action
      const nextState = threadsReducer(state, action);

      // Assert
      expect(nextState).toEqual({
        datas: null,
        dataDetail: null,
        dataCreate: null,
        message: null,
        isError: false,
        isLoading: true,
      });
    });

    it('Fulfilled(success): Should return {isLoading, isError = false and message = success, dataDetail = Thread detail}', () => {
      // Arrange
      const state = initialState;
      const action = getThreadDetail.fulfilled({
        error: false,
        message: 'success',
        isLoading: false,
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
      });

      // Action
      const nextState = threadsReducer(state, action);

      // Assert
      expect(nextState).toEqual({
        datas: null,
        dataDetail: {
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
        dataCreate: null,
        message: 'success',
        isError: false,
        isLoading: false,
      });
    });

    it('Fulfilled(failed): Should return {isLoading = false, isError = true and message = failed}', () => {
      // Arrange
      const state = initialState;
      const action = getThreadDetail.fulfilled({
        error: true,
        isLoading: false,
        message: 'failed',
      });

      // Action
      const nextState = threadsReducer(state, action);

      // Assert
      expect(nextState).toEqual({
        datas: null,
        dataDetail: null,
        dataCreate: null,
        message: 'failed',
        isError: true,
        isLoading: false,
      });
    });

    it('Rejected: Should return {isLoading = false, isError = true and message = rejected}', () => {
      // Arrange
      const state = initialState;
      const action = getThreadDetail.rejected({
        error: true,
        isLoading: false,
        message: 'rejected',
      });

      // Action
      const nextState = threadsReducer(state, action);

      // Assert
      expect(nextState).toEqual({
        datas: null,
        dataDetail: null,
        dataCreate: null,
        message: 'rejected',
        isError: true,
        isLoading: false,
      });
    });
  });

  describe('addThread', () => {
    it('Pending: Should return {isLoading = true, isError = false, message = null, dataCreate = null}', () => {
      // Arrange
      const state = initialState;
      const action = addThread.pending;

      // Action
      const nextState = threadsReducer(state, action);

      // Assert
      expect(nextState).toEqual({
        datas: null,
        dataDetail: null,
        dataCreate: null,
        message: null,
        isError: false,
        isLoading: true,
      });
    });

    it('Fulfilled(success): Should return {isLoading, isError = false and message = success, dataCreate = Thread created}', () => {
      // Arrange
      const state = initialState;
      const action = addThread.fulfilled({
        error: false,
        isLoading: false,
        message: 'success',
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
      });

      // Action
      const nextState = threadsReducer(state, action);

      // Assert
      expect(nextState).toEqual({
        datas: null,
        dataDetail: null,
        dataCreate: {
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
        message: 'success',
        isError: false,
        isLoading: false,
      });
    });

    it('Fulfilled(failed): Should return {isLoading = false, isError = true and message = failed}', () => {
      // Arrange
      const state = initialState;
      const action = addThread.fulfilled({
        error: true,
        isLoading: false,
        message: 'failed',
      });

      // Action
      const nextState = threadsReducer(state, action);

      // Assert
      expect(nextState).toEqual({
        datas: null,
        dataDetail: null,
        dataCreate: null,
        message: 'failed',
        isError: true,
        isLoading: false,
      });
    });

    it('Rejected: Should return {isLoading = false, isError = true and message = rejected}', () => {
      // Arrange
      const state = initialState;
      const action = addThread.rejected({
        error: true,
        isLoading: false,
        message: 'rejected',
      });

      // Action
      const nextState = threadsReducer(state, action);

      // Assert
      expect(nextState).toEqual({
        datas: null,
        dataDetail: null,
        dataCreate: null,
        message: 'rejected',
        isError: true,
        isLoading: false,
      });
    });
  });
});
