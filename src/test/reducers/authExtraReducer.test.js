import { expect, it, describe, beforeEach, afterEach } from 'vitest';
import {
  registerUser,
  loginUser,
  getProfileUser,
} from '../../redux/features/auth/authThunk';
import authReducer from '../../redux/features/auth/authSlice';
import mockLocalStorage from '../../utils/test/mockLocalStorage';
import { getAccessToken } from '../../utils/api/userAPI';

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
      const state = initialState;
      const action = registerUser.pending;

      const nextState = authReducer(state, action);

      expect(nextState).toEqual({
        data: null,
        token: null,
        message: null,
        isError: false,
        isLoading: true,
      });
    });

    it('Fulfilled(success): Should return {isLoading, isError = false and message success}', () => {
      const state = initialState;
      const action = registerUser.fulfilled({
        error: false,
        message: 'success',
        isLoading: false,
      });

      const nextState = authReducer(state, action);

      expect(nextState).toEqual({
        data: null,
        token: null,
        message: 'success',
        isError: false,
        isLoading: false,
      });
    });

    it('Fulfilled(failed): Should return {isLoading = false, isError = true and message failed}', () => {
      const state = initialState;
      const action = registerUser.fulfilled({
        error: true,
        message: 'failed to register',
        isLoading: false,
      });

      const nextState = authReducer(state, action);

      expect(nextState).toEqual({
        data: null,
        token: null,
        message: 'failed to register',
        isError: true,
        isLoading: false,
      });
    });

    it('Rejected: Should return {isLoading = false, isError = true and message rejected}', () => {
      const state = initialState;
      const action = registerUser.rejected({
        error: true,
        message: 'rejected',
        isLoading: false,
      });

      const nextState = authReducer(state, action);

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
      const state = initialState;
      const action = loginUser.pending;

      const nextState = authReducer(state, action);

      expect(nextState).toEqual({
        data: null,
        token: null,
        message: null,
        isError: false,
        isLoading: true,
      });
    });

    it('Fulfilled(success): Should return {isLoading, isError = false, message success, token = "ExampleToken"}', () => {
      const state = initialState;
      const action = loginUser.fulfilled({
        error: false,
        isLoading: false,
        message: 'success',
        data: {
          token: 'ExampleToken',
        },
      });

      const nextState = authReducer(state, action);

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
      const state = initialState;
      const action = loginUser.fulfilled({
        error: true,
        isLoading: false,
        message: 'failed to login',
      });

      const nextState = authReducer(state, action);

      expect(nextState).toEqual({
        data: null,
        token: null,
        message: 'failed to login',
        isError: true,
        isLoading: false,
      });
    });

    it('Rejected: Should return {isLoading = false, isError = true and message rejected}', () => {
      const state = initialState;
      const action = loginUser.rejected({
        error: true,
        isLoading: false,
        message: 'rejected',
      });

      const nextState = authReducer(state, action);

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
      const state = initialState;
      const action = getProfileUser.pending;

      const nextState = authReducer(state, action);

      expect(nextState).toEqual({
        data: null,
        token: null,
        message: null,
        isError: false,
        isLoading: true,
      });
    });

    it('Fulfilled(success): Should return {isLoading, isError = false, message success, data = profile user}', () => {
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

      const nextState = authReducer(state, action);

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
      const state = initialState;
      const action = getProfileUser.fulfilled({
        error: true,
        isLoading: false,
        message: 'failed to get profile',
      });

      const nextState = authReducer(state, action);

      expect(nextState).toEqual({
        data: null,
        token: null,
        message: 'failed to get profile',
        isError: true,
        isLoading: false,
      });
    });

    it('Rejected: Should return {isLoading = false, isError = true and message rejected}', () => {
      const state = initialState;
      const action = getProfileUser.rejected({
        error: true,
        isLoading: false,
        message: 'rejected',
      });

      const nextState = authReducer(state, action);

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
