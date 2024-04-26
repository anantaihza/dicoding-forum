import { expect, it, describe } from 'vitest';
import voteCommentReducer from '../../redux/features/voteComment/voteCommentSlice';
import {
  upVote,
  downVote,
  neutralizeVote,
} from '../../redux/features/voteComment/voteCommentThunk';

/**
 *
 * SKENARIO TESTING
 *
 * Extra Reducer: voteCommentReducer
 *
 * 1. upVote
 *    - Pending: Should return {isLoading = true, isError = false, message = null, vote = null}
 *    - Fulfilled(success): Should return {isLoading,isError = false and message = success}
 *    - Fulfilled(failed): Should return {isLoading = false, isError = true and message failed}
 *    - Rejected: Should return {isLoading = false, isError = true and message rejected}
 *
 * 2. downVote
 *    - Pending: Should return {isLoading = true, isError = false, message = null, vote = null}
 *    - Fulfilled(success): Should return {isLoading,isError = false and message = success}
 *    - Fulfilled(failed): Should return {isLoading = false, isError = true and message failed}
 *    - Rejected: Should return {isLoading = false, isError = true and message rejected}
 *
 * 3. neutralizeVote
 *    - Pending: Should return {isLoading = true, isError = false, message = null, vote = null}
 *    - Fulfilled(success): Should return {isLoading,isError = false and message = success}
 *    - Fulfilled(failed): Should return {isLoading = false, isError = true and message failed}
 *    - Rejected: Should return {isLoading = false, isError = true and message rejected}
 *
 */
describe('Vote Comment reducers test', () => {
  const initialState = {
    vote: null,
    message: null,
    isError: false,
    isLoading: false,
  };

  describe('upVote', () => {
    it('Pending: Should return {isLoading = true, isError = false, message = null, vote = null}', () => {
      // Arrange
      const state = initialState;
      const action = upVote.pending;

      // Action
      const nextState = voteCommentReducer(state, action);

      // Assert
      expect(nextState).toEqual({
        vote: null,
        message: null,
        isError: false,
        isLoading: true,
      });
    });

    it('Fulfilled(success): Should return {isLoading,isError = false and message = success}', () => {
      // Arrange
      const state = initialState;
      const action = upVote.fulfilled({
        error: false,
        isLoading: false,
        message: 'success',
        data: {
          id: 'vote-1',
          userId: 'users-1',
          commentId: 'comment-1',
          voteType: 1,
        },
      });

      // Action
      const nextState = voteCommentReducer(state, action);

      // Assert
      expect(nextState).toEqual({
        vote: {
          id: 'vote-1',
          userId: 'users-1',
          commentId: 'comment-1',
          voteType: 1,
        },
        message: 'success',
        isError: false,
        isLoading: false,
      });
    });

    it('Fulfilled(failed): Should return {isLoading = false, isError = true and message failed}', () => {
      // Arrange
      const state = initialState;
      const action = upVote.fulfilled({
        error: true,
        isLoading: false,
        message: 'failed',
      });

      // Action
      const nextState = voteCommentReducer(state, action);

      // Assert
      expect(nextState).toEqual({
        vote: null,
        message: 'failed',
        isError: true,
        isLoading: false,
      });
    });

    it('Rejected: Should return {isLoading = false, isError = true and message rejected}', () => {
      // Arrange
      const state = initialState;
      const action = upVote.rejected({
        error: true,
        message: 'rejected',
        isLoading: false,
      });

      // Action
      const nextState = voteCommentReducer(state, action);

      // Assert
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
      // Arrange
      const state = initialState;
      const action = downVote.pending;

      // Action
      const nextState = voteCommentReducer(state, action);

      // Assert
      expect(nextState).toEqual({
        vote: null,
        message: null,
        isError: false,
        isLoading: true,
      });
    });

    it('Fulfilled(success): Should return {isLoading,isError = false and message = success}', () => {
      // Arrange
      const state = initialState;
      const action = downVote.fulfilled({
        error: false,
        isLoading: false,
        message: 'success',
        data: {
          id: 'vote-1',
          userId: 'users-1',
          commentId: 'comment-1',
          voteType: -1,
        },
      });

      // Action
      const nextState = voteCommentReducer(state, action);

      // Assert
      expect(nextState).toEqual({
        vote: {
          id: 'vote-1',
          userId: 'users-1',
          commentId: 'comment-1',
          voteType: -1,
        },
        message: 'success',
        isError: false,
        isLoading: false,
      });
    });

    it('Fulfilled(failed): Should return {isLoading = false, isError = true and message failed}', () => {
      // Arrange
      const state = initialState;
      const action = downVote.fulfilled({
        error: true,
        isLoading: false,
        message: 'failed',
      });

      // Action
      const nextState = voteCommentReducer(state, action);

      // Assert
      expect(nextState).toEqual({
        vote: null,
        message: 'failed',
        isError: true,
        isLoading: false,
      });
    });

    it('Rejected: Should return {isLoading = false, isError = true and message rejected}', () => {
      // Arrange
      const state = initialState;
      const action = downVote.rejected({
        error: true,
        message: 'rejected',
        isLoading: false,
      });

      // Action
      const nextState = voteCommentReducer(state, action);

      // Assert
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
      // Arrange
      const state = initialState;
      const action = neutralizeVote.pending;

      // Action
      const nextState = voteCommentReducer(state, action);

      // Assert
      expect(nextState).toEqual({
        vote: null,
        message: null,
        isError: false,
        isLoading: true,
      });
    });

    it('Fulfilled(success): Should return {isLoading,isError = false and message = success}', () => {
      // Arrange
      const state = initialState;
      const action = neutralizeVote.fulfilled({
        error: false,
        isLoading: false,
        message: 'success',
        data: {
          id: 'vote-1',
          userId: 'users-1',
          commentId: 'comment-1',
          voteType: 0,
        },
      });

      // Action
      const nextState = voteCommentReducer(state, action);

      // Assert
      expect(nextState).toEqual({
        vote: {
          id: 'vote-1',
          userId: 'users-1',
          commentId: 'comment-1',
          voteType: 0,
        },
        message: 'success',
        isError: false,
        isLoading: false,
      });
    });

    it('Fulfilled(failed): Should return {isLoading = false, isError = true and message failed}', () => {
      // Arrange
      const state = initialState;
      const action = neutralizeVote.fulfilled({
        error: true,
        isLoading: false,
        message: 'failed',
      });

      // Action
      const nextState = voteCommentReducer(state, action);

      // Assert
      expect(nextState).toEqual({
        vote: null,
        message: 'failed',
        isError: true,
        isLoading: false,
      });
    });

    it('Rejected: Should return {isLoading = false, isError = true and message rejected}', () => {
      // Arrange
      const state = initialState;
      const action = neutralizeVote.rejected({
        error: true,
        message: 'rejected',
        isLoading: false,
      });

      // Action
      const nextState = voteCommentReducer(state, action);

      // Assert
      expect(nextState).toEqual({
        vote: null,
        message: 'rejected',
        isError: true,
        isLoading: false,
      });
    });
  });
});
