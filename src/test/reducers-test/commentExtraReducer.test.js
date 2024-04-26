import { expect, it, describe } from 'vitest';
import commentReducer from '../../redux/features/comment/commentSlice';
import addComment from '../../redux/features/comment/commentThunk';

/**
 *
 * SKENARIO TESTING
 *
 * Extra Reducer: commentReducer
 *
 * 1. addComment
 *    - Pending: Should return {isLoading = true, isError = false, message = null, comments = null}
 *    - Fulfilled(success): Should return {isLoading,isError = false, message = success, comments = comment}
 *    - Fulfilled(error): Should return {isLoading,isError = true, message = error, comments = null}
 *    - Rejected: Should return {isLoading,isError = true, message = error, comments = null}
 *
 */
describe('Comment reducer test', () => {
  const initialState = {
    comments: null,
    message: null,
    isError: false,
    isLoading: false,
  };

  describe('addComment', () => {
    it('Pending: Should return {isLoading = true, isError = false, message = null, comments = null}', () => {
      // Arrange
      const state = initialState;
      const action = addComment.pending;

      // Action
      const nextState = commentReducer(state, action);

      // Assert
      expect(nextState).toEqual({
        comments: null,
        message: null,
        isError: false,
        isLoading: true,
      });
    });

    it('Fulfilled(success): Should return {isLoading,isError = false, message = success, comments = comment}', () => {
      // Arrange
      const state = initialState;

      const action = addComment.fulfilled({
        error: false,
        message: 'success',
        isLoading: false,
        data: {
          id: 'comment-1',
          content: 'Ini adalah komentar pertama',
          createdAt: '2021-06-21T07:00:00.000Z',
          upVotesBy: [],
          downVotesBy: [],
          owner: {
            id: 'users-1',
            name: 'John Doe',
            email: 'john@example.com',
          },
        },
      });

      // Action
      const nextState = commentReducer(state, action);

      // Assert
      expect(nextState).toEqual({
        comments: {
          id: 'comment-1',
          content: 'Ini adalah komentar pertama',
          createdAt: '2021-06-21T07:00:00.000Z',
          upVotesBy: [],
          downVotesBy: [],
          owner: {
            id: 'users-1',
            name: 'John Doe',
            email: 'john@example.com',
          },
        },
        message: 'success',
        isError: false,
        isLoading: false,
      });
    });

    it('Fulfilled(error): Should return {isLoading,isError = true, message = error, comments = null}', () => {
      // Arrange
      const state = initialState;
      const action = addComment.fulfilled({
        error: true,
        message: 'error',
        isLoading: false,
        data: null,
      });

      // Action
      const nextState = commentReducer(state, action);

      // Assert
      expect(nextState).toEqual({
        comments: null,
        message: 'error',
        isError: true,
        isLoading: false,
      });
    });

    it('Rejected: Should return {isLoading,isError = true, message = error, comments = null}', () => {
      // Arrange
      const state = initialState;
      const action = addComment.rejected({
        error: true,
        message: 'error',
        isLoading: false,
      });

      // Action
      const nextState = commentReducer(state, action);

      // Assert
      expect(nextState).toEqual({
        comments: null,
        message: 'error',
        isError: true,
        isLoading: false,
      });
    });
  });
});
