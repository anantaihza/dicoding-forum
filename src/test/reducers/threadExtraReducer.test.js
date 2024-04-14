import { expect, it, describe } from 'vitest';
import {
  getThreads,
  getThreadDetail,
  addThread,
} from '../../redux/features/threads/threadsThunk';
import threadsReducer from '../../redux/features/threads/threadsSlice';

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
      const state = initialState;
      const action = getThreads.pending;

      const nextState = threadsReducer(state, action);

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

      const nextState = threadsReducer(state, action);

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
      const state = initialState;
      const action = getThreads.fulfilled({
        error: true,
        message: 'failed',
        isLoading: false,
      });

      const nextState = threadsReducer(state, action);

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
      const state = initialState;
      const action = getThreads.rejected({
        error: true,
        message: 'rejected',
        isLoading: false,
      });

      const nextState = threadsReducer(state, action);

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
      const state = initialState;
      const action = getThreadDetail.pending;

      const nextState = threadsReducer(state, action);

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

      const nextState = threadsReducer(state, action);

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
      const state = initialState;
      const action = getThreadDetail.fulfilled({
        error: true,
        isLoading: false,
        message: 'failed',
      });

      const nextState = threadsReducer(state, action);

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
      const state = initialState;
      const action = getThreadDetail.rejected({
        error: true,
        isLoading: false,
        message: 'rejected',
      });

      const nextState = threadsReducer(state, action);

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
      const state = initialState;
      const action = addThread.pending;

      const nextState = threadsReducer(state, action);

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

      const nextState = threadsReducer(state, action);

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
      const state = initialState;
      const action = addThread.fulfilled({
        error: true,
        isLoading: false,
        message: 'failed',
      });

      const nextState = threadsReducer(state, action);

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
      const state = initialState;
      const action = addThread.rejected({
        error: true,
        isLoading: false,
        message: 'rejected',
      });

      const nextState = threadsReducer(state, action);

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
