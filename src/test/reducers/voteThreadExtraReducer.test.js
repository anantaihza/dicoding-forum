import { expect, it, describe } from 'vitest';
import voteCommentReducer from '../../redux/features/voteThread/voteThreadSlice';
import {
  upVote,
  downVote,
  neutralizeVote,
} from '../../redux/features/voteThread/voteThreadThunk';

describe('Vote Comment reducers test', () => {
  const initialState = {
    vote: null,
    message: null,
    isError: false,
    isLoading: false,
  };

  describe('upVote', () => {
    it('Pending: Should return {isLoading = true, isError = false, message = null, vote = null}', () => {
      const state = initialState;
      const action = upVote.pending;

      const nextState = voteCommentReducer(state, action);

      expect(nextState).toEqual({
        vote: null,
        message: null,
        isError: false,
        isLoading: true,
      });
    });

    it('Fulfilled(success): Should return {isLoading,isError = false and message = success}', () => {
      const state = initialState;
      const action = upVote.fulfilled({
        error: false,
        isLoading: false,
        message: 'success',
        data: {
          id: 'vote-1',
          userId: 'users-1',
          threadId: 'thread-1',
          voteType: 1,
        },
      });

      const nextState = voteCommentReducer(state, action);

      expect(nextState).toEqual({
        vote: {
          id: 'vote-1',
          userId: 'users-1',
          threadId: 'thread-1',
          voteType: 1,
        },
        message: 'success',
        isError: false,
        isLoading: false,
      });
    });

    it('Fulfilled(failed): Should return {isLoading = false, isError = true and message failed}', () => {
      const state = initialState;
      const action = upVote.fulfilled({
        error: true,
        isLoading: false,
        message: 'failed',
      });

      const nextState = voteCommentReducer(state, action);

      expect(nextState).toEqual({
        vote: null,
        message: 'failed',
        isError: true,
        isLoading: false,
      });
    });

    it('Rejected: Should return {isLoading = false, isError = true and message rejected}', () => {
      const state = initialState;
      const action = upVote.rejected({
        error: true,
        message: 'rejected',
        isLoading: false,
      });

      const nextState = voteCommentReducer(state, action);

      expect(nextState).toEqual({
        vote: null,
        message: 'rejected',
        isError: true,
        isLoading: false,
      });
    });
  });

  describe('downVote', () => {
    it('Pending: Should return {isLoading = true, isError = false, message = null, vote = null}', () => {
      const state = initialState;
      const action = downVote.pending;

      const nextState = voteCommentReducer(state, action);

      expect(nextState).toEqual({
        vote: null,
        message: null,
        isError: false,
        isLoading: true,
      });
    });

    it('Fulfilled(success): Should return {isLoading,isError = false and message = success}', () => {
      const state = initialState;
      const action = downVote.fulfilled({
        error: false,
        isLoading: false,
        message: 'success',
        data: {
          id: 'vote-1',
          userId: 'users-1',
          threadId: 'thread-1',
          voteType: -1,
        },
      });

      const nextState = voteCommentReducer(state, action);

      expect(nextState).toEqual({
        vote: {
          id: 'vote-1',
          userId: 'users-1',
          threadId: 'thread-1',
          voteType: -1,
        },
        message: 'success',
        isError: false,
        isLoading: false,
      });
    });

    it('Fulfilled(failed): Should return {isLoading = false, isError = true and message failed}', () => {
      const state = initialState;
      const action = downVote.fulfilled({
        error: true,
        isLoading: false,
        message: 'failed',
      });

      const nextState = voteCommentReducer(state, action);

      expect(nextState).toEqual({
        vote: null,
        message: 'failed',
        isError: true,
        isLoading: false,
      });
    });

    it('Rejected: Should return {isLoading = false, isError = true and message rejected}', () => {
      const state = initialState;
      const action = downVote.rejected({
        error: true,
        message: 'rejected',
        isLoading: false,
      });

      const nextState = voteCommentReducer(state, action);

      expect(nextState).toEqual({
        vote: null,
        message: 'rejected',
        isError: true,
        isLoading: false,
      });
    });
  });

  describe('neutralizeVote', () => {
    it('Pending: Should return {isLoading = true, isError = false, message = null, vote = null}', () => {
      const state = initialState;
      const action = neutralizeVote.pending;

      const nextState = voteCommentReducer(state, action);

      expect(nextState).toEqual({
        vote: null,
        message: null,
        isError: false,
        isLoading: true,
      });
    });

    it('Fulfilled(success): Should return {isLoading,isError = false and message = success}', () => {
      const state = initialState;
      const action = neutralizeVote.fulfilled({
        error: false,
        isLoading: false,
        message: 'success',
        data: {
          id: 'vote-1',
          userId: 'users-1',
          threadId: 'thread-1',
          voteType: 0,
        },
      });

      const nextState = voteCommentReducer(state, action);

      expect(nextState).toEqual({
        vote: {
          id: 'vote-1',
          userId: 'users-1',
          threadId: 'thread-1',
          voteType: 0,
        },
        message: 'success',
        isError: false,
        isLoading: false,
      });
    });

    it('Fulfilled(failed): Should return {isLoading = false, isError = true and message failed}', () => {
      const state = initialState;
      const action = neutralizeVote.fulfilled({
        error: true,
        isLoading: false,
        message: 'failed',
      });

      const nextState = voteCommentReducer(state, action);

      expect(nextState).toEqual({
        vote: null,
        message: 'failed',
        isError: true,
        isLoading: false,
      });
    });

    it('Rejected: Should return {isLoading = false, isError = true and message rejected}', () => {
      const state = initialState;
      const action = neutralizeVote.rejected({
        error: true,
        message: 'rejected',
        isLoading: false,
      });

      const nextState = voteCommentReducer(state, action);

      expect(nextState).toEqual({
        vote: null,
        message: 'rejected',
        isError: true,
        isLoading: false,
      });
    });
  });
});
