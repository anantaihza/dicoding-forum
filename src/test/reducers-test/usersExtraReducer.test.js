import { expect, it, describe } from 'vitest';
import usersReducer from '../../redux/features/users/usersSlice';
import getUsers from '../../redux/features/users/usersThunk';

/**
 *
 * SKENARIO TESTING
 *
 * Extra Reducer: usersReducer
 *
 * 1. getUsers
 *    - Pending: Should return {isLoading = true, isError = false, message = null, users = null}
 *    - Fulfilled(success): Should return {isLoading,isError = false, message = success, users = all user}
 *    - Fulfilled(failed): Should return {isLoading = false, isError = true, message = failed}
 *    - Rejected: Should return {isLoading = false, isError = true, message = rejected}
 *
 */
describe('Users reducer test', () => {
  const initialState = {
    users: null,
    profileUser: null,
    message: null,
    isError: false,
    isLoading: false,
  };

  describe('getUsers', () => {
    it('Pending: Should return {isLoading = true, isError = false, message = null, users = null}', () => {
      // Arrange
      const state = initialState;
      const action = getUsers.pending;

      // Action
      const nextState = usersReducer(state, action);

      // Assert
      expect(nextState).toEqual({
        users: null,
        profileUser: null,
        message: null,
        isError: false,
        isLoading: true,
      });
    });

    it('Fulfilled(success): Should return {isLoading,isError = false, message = success, users = all user}', () => {
      // Arrange
      const state = initialState;
      const action = getUsers.fulfilled({
        error: false,
        message: 'success',
        isLoading: false,
        data: [
          {
            id: 'john_doe',
            name: 'John Doe',
            email: 'john@example.com',
            avatar: 'https://generated-image-url.jpg',
          },
          {
            id: 'jane_doe',
            name: 'Jane Doe',
            email: 'jane@example.com',
            avatar: 'https://generated-image-url.jpg',
          },
        ],
      });

      // Action
      const nextState = usersReducer(state, action);

      // Assert
      expect(nextState).toEqual({
        users: [
          {
            id: 'john_doe',
            name: 'John Doe',
            email: 'john@example.com',
            avatar: 'https://generated-image-url.jpg',
          },
          {
            id: 'jane_doe',
            name: 'Jane Doe',
            email: 'jane@example.com',
            avatar: 'https://generated-image-url.jpg',
          },
        ],
        profileUser: null,
        message: 'success',
        isError: false,
        isLoading: false,
      });
    });

    it('Fulfilled(failed): Should return {isLoading = false, isError = true, message = failed}', () => {
      // Arrange
      const state = initialState;
      const action = getUsers.fulfilled({
        error: true,
        message: 'failed',
        isLoading: false,
      });

      // Action
      const nextState = usersReducer(state, action);

      // Assert
      expect(nextState).toEqual({
        users: null,
        profileUser: null,
        message: 'failed',
        isError: true,
        isLoading: false,
      });
    });

    it('Rejected: Should return {isLoading = false, isError = true, message = rejected}', () => {
      // Arrange
      const state = initialState;
      const action = getUsers.rejected({
        error: true,
        message: 'rejected',
        isLoading: false,
      });

      // Action
      const nextState = usersReducer(state, action);

      // Assert
      expect(nextState).toEqual({
        users: null,
        profileUser: null,
        message: 'rejected',
        isError: true,
        isLoading: false,
      });
    });
  });
});
