import { expect, it, describe } from 'vitest';
import usersReducer from './usersSlice';
import getUsers from './usersThunk';

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
      const state = initialState;
      const action = getUsers.pending;

      const nextState = usersReducer(state, action);

      expect(nextState).toEqual({
        users: null,
        profileUser: null,
        message: null,
        isError: false,
        isLoading: true,
      });
    });

    it('Fulfilled(success): Should return {isLoading,isError = false, message = success, users = all user}', () => {
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

      const nextState = usersReducer(state, action);

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
      const state = initialState;
      const action = getUsers.fulfilled({
        error: true,
        message: 'failed',
        isLoading: false,
      });

      const nextState = usersReducer(state, action);

      expect(nextState).toEqual({
        users: null,
        profileUser: null,
        message: 'failed',
        isError: true,
        isLoading: false,
      });
    });

    it('Rejected: Should return {isLoading = false, isError = true, message = rejected}', () => {
      const state = initialState;
      const action = getUsers.rejected({
        error: true,
        message: 'rejected',
        isLoading: false,
      });

      const nextState = usersReducer(state, action);

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
