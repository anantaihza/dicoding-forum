import { expect, it, describe, beforeEach, afterEach } from 'vitest';
import {
  registerUser,
  loginUser,
  getProfileUser,
} from '../../redux/features/auth/authThunk';
import authReducer from '../../redux/features/auth/authSlice';
import mockLocalStorage from '../../utils/test/mockLocalStorage';
import { getAccessToken } from '../../utils/api/userAPI';

/**
 *
 * SKENARIO TESTING
 *
 * Extra Reducer: authReducer
 *
 * 1. registerUser
 *    - Pending: Should return {isLoading, isError = false and message null}
 *    - Fulfilled(success): Should return {isLoading, isError = false and message success}
 *    - Fulfilled(failed): Should return {isLoading, isError = true and message failed}
 *    - Rejected: Should return {isLoading, isError = true and message rejected}
 * 2. loginUser
 *    - Pending: Should return {isLoading = true, isError = false and message null}
 *    - Fulfilled(success): Should return {isLoading, isError = false, message success, token = "ExampleToken"}
 *    - Fulfilled(failed): Should return {isLoading = false, isError = true and message failed}
 *    - Rejected: Should return {isLoading = false, isError = true and message rejected}
 * 3. getProfileUser
 *    - Pending: Should return {isLoading = true, isError = false and message null}
 *    - Fulfilled(success): Should return {isLoading, isError = false, message success, data = profile user}
 *    - Fulfilled(failed): Should return {isLoading = false, isError = true and message failed}
 *    - Rejected: Should return {isLoading = false, isError = true and message rejected}
 *
 */
describe('Authentication extraReducers test', () => {
  const initialState = {
    data: null,
    token: null,
    message: null,
    isError: false,
    isLoading: false,
  };

  describe('registerUser', () => {
    it('Pending: Should return {isLoading, isError = false and message null}', () => {
      // Arrange
      const state = initialState;
      const action = registerUser.pending;

      // Action
      const nextState = authReducer(state, action);

      // Assert
      expect(nextState).toEqual({
        data: null,
        token: null,
        message: null,
        isError: false,
        isLoading: true,
      });
    });

    it('Fulfilled(success): Should return {isLoading, isError = false and message success}', () => {
      // Arrange
      const state = initialState;
      const action = registerUser.fulfilled({
        error: false,
        message: 'success',
        isLoading: false,
      });

      // Action
      const nextState = authReducer(state, action);

      // Assert
      expect(nextState).toEqual({
        data: null,
        token: null,
        message: 'success',
        isError: false,
        isLoading: false,
      });
    });

    it('Fulfilled(failed): Should return {isLoading = false, isError = true and message failed}', () => {
      // Arrange
      const state = initialState;
      const action = registerUser.fulfilled({
        error: true,
        message: 'failed to register',
        isLoading: false,
      });

      // Action
      const nextState = authReducer(state, action);

      // Assert
      expect(nextState).toEqual({
        data: null,
        token: null,
        message: 'failed to register',
        isError: true,
        isLoading: false,
      });
    });

    it('Rejected: Should return {isLoading = false, isError = true and message rejected}', () => {
      // Arrange
      const state = initialState;
      const action = registerUser.rejected({
        error: true,
        message: 'rejected',
        isLoading: false,
      });

      // Action
      const nextState = authReducer(state, action);

      // Assert
      expect(nextState).toEqual({
        data: null,
        token: null,
        message: 'rejected',
        isError: true,
        isLoading: false,
      });
    });
  });

  describe('loginUser', () => {
    beforeEach(() => {
      // Setup mock localStorage
      const localStorageMock = mockLocalStorage();
      global.localStorage = localStorageMock;
    });

    afterEach(() => {
      // Clean up
      global.localStorage = undefined;
    });

    it('Pending: Should return {isLoading = true, isError = false and message null}', () => {
      // Arrange
      const state = initialState;
      const action = loginUser.pending;

      // Action
      const nextState = authReducer(state, action);

      // Assert
      expect(nextState).toEqual({
        data: null,
        token: null,
        message: null,
        isError: false,
        isLoading: true,
      });
    });

    it('Fulfilled(success): Should return {isLoading, isError = false, message success, token = "ExampleToken"}', () => {
      // Arrange
      const state = initialState;
      const action = loginUser.fulfilled({
        error: false,
        isLoading: false,
        message: 'success',
        data: {
          token: 'ExampleToken',
        },
      });

      // Action
      const nextState = authReducer(state, action);

      // Assert
      expect(nextState).toEqual({
        data: null,
        token: 'ExampleToken',
        message: 'success',
        isError: false,
        isLoading: false,
      });
      expect(getAccessToken()).toEqual('ExampleToken');
    });

    it('Fulfilled(failed): Should return {isLoading = false, isError = true and message failed}', () => {
      // Arrange
      const state = initialState;
      const action = loginUser.fulfilled({
        error: true,
        isLoading: false,
        message: 'failed to login',
      });

      // Action
      const nextState = authReducer(state, action);

      // Assert
      expect(nextState).toEqual({
        data: null,
        token: null,
        message: 'failed to login',
        isError: true,
        isLoading: false,
      });
    });

    it('Rejected: Should return {isLoading = false, isError = true and message rejected}', () => {
      // Arrange
      const state = initialState;
      const action = loginUser.rejected({
        error: true,
        isLoading: false,
        message: 'rejected',
      });

      // Action
      const nextState = authReducer(state, action);

      // Assert
      expect(nextState).toEqual({
        data: null,
        token: null,
        message: 'rejected',
        isError: true,
        isLoading: false,
      });
    });
  });

  describe('getProfileUser', () => {
    it('Pending: Should return {isLoading = true, isError = false and message null}', () => {
      // Arrange
      const state = initialState;
      const action = getProfileUser.pending;

      // Action
      const nextState = authReducer(state, action);

      // Assert
      expect(nextState).toEqual({
        data: null,
        token: null,
        message: null,
        isError: false,
        isLoading: true,
      });
    });

    it('Fulfilled(success): Should return {isLoading, isError = false, message success, data = profile user}', () => {
      // Arrange
      const state = initialState;
      const action = getProfileUser.fulfilled({
        error: false,
        isLoading: false,
        message: 'success',
        data: {
          id: 'john_doe',
          name: 'John Doe',
          email: 'john@example.com',
          avatar: 'https://generated-image-url.jpg',
        },
      });

      // Action
      const nextState = authReducer(state, action);

      // Assert
      expect(nextState).toEqual({
        data: {
          id: 'john_doe',
          name: 'John Doe',
          email: 'john@example.com',
          avatar: 'https://generated-image-url.jpg',
        },
        token: null,
        message: 'success',
        isError: false,
        isLoading: false,
      });
    });

    it('Fulfilled(failed): Should return {isLoading = false, isError = true and message failed}', () => {
      // Arrange
      const state = initialState;
      const action = getProfileUser.fulfilled({
        error: true,
        isLoading: false,
        message: 'failed to get profile',
      });

      // Action
      const nextState = authReducer(state, action);

      // Assert
      expect(nextState).toEqual({
        data: null,
        token: null,
        message: 'failed to get profile',
        isError: true,
        isLoading: false,
      });
    });

    it('Rejected: Should return {isLoading = false, isError = true and message rejected}', () => {
      // Arrange
      const state = initialState;
      const action = getProfileUser.rejected({
        error: true,
        isLoading: false,
        message: 'rejected',
      });

      // Action
      const nextState = authReducer(state, action);

      // Assert
      expect(nextState).toEqual({
        data: null,
        token: null,
        message: 'rejected',
        isError: true,
        isLoading: false,
      });
    });
  });
});
