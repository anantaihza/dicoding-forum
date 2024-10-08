import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import {
  registerUser,
  loginUser,
  getProfileUser,
} from '../../redux/features/auth/authThunk';

import * as userAPI from '../../utils/api/userAPI';

/**
 *
 * SKENARIO TESTING
 *
 * Thunk: authThunk
 *
 * 1. Register User
 *    - Should dispatch the correct actions on successful registration
 *    - Should dispatch the correct actions on failed registration
 *
 * 2. Login User
 *    - Should dispatch the correct actions on successful login
 *    - Should dispatch the correct actions on failed login
 *
 * 3. Get Profile User
 *    - Should dispatch the correct actions on successful get profile
 *    - Should dispatch the correct actions on failed get profile
 *
 */
describe('Auth Thunk', () => {
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

  describe('registerUser', () => {
    let registerMock;
    const userData = {
      name: 'John Doe',
      email: 'jhonA@example.com',
      password: 'password123',
    };

    beforeEach(() => {
      registerMock = vi.spyOn(userAPI, 'register');
    });

    afterEach(() => {
      registerMock.mockClear();
    });

    it('Should dispatch the correct actions on successful registration', async () => {
      // Arrange
      const mockResponse = {
        error: false,
        status: 'success',
        message: 'Register Success',
        data: {
          id: 'john_doe',
          name: 'John Doe',
          email: 'jhonA@example.com',
          avatar: 'https://generated-image-url.jpg',
        },
      };

      registerMock.mockResolvedValueOnce(mockResponse);

      // Action
      await registerUser(userData)(dispatch, getState);

      // Assert
      expect(dispatch).toHaveBeenCalledWith({
        type: 'auth/register/pending',
        meta: {
          arg: userData,
          requestId: expect.any(String),
          requestStatus: 'pending',
        },
      });

      expect(dispatch).toHaveBeenCalledWith({
        type: 'auth/register/fulfilled',
        payload: mockResponse,
        meta: {
          arg: userData,
          requestId: expect.any(String),
          requestStatus: 'fulfilled',
        },
      });
    });

    it('Should dispatch the correct actions on failed registration', async () => {
      // Arrange
      const mockResponse = {
        error: true,
        status: 'failed',
        message: 'Register Failed',
      };

      registerMock.mockRejectedValueOnce(mockResponse);

      // Action
      await registerUser(userData)(dispatch, getState);

      // Assert
      expect(dispatch).toHaveBeenCalledWith({
        type: 'auth/register/pending',
        meta: {
          arg: userData,
          requestId: expect.any(String),
          requestStatus: 'pending',
        },
      });

      expect(dispatch).toHaveBeenCalledWith({
        type: 'auth/register/rejected',
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

  describe('loginUser', () => {
    let loginMock;

    beforeEach(() => {
      loginMock = vi.spyOn(userAPI, 'login');
    });

    afterEach(() => {
      loginMock.mockClear();
    });

    const userData = {
      email: 'jhonA@example.com',
      password: 'password123',
    };

    it('Should dispatch the correct actions on successful login', async () => {
      // Arrange
      const mockResponse = {
        error: false,
        status: 'success',
        message: 'Login Success',
        data: {
          token:
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImRpbWFzMiIsIm5hbWUiOiJEaW1hcyBTYXB1dHJhIiwicGhvdG8iOiJodHRwczovL3VpLWF2YXRhcnMuY29tL2FwaS8_bmFtZT1EaW1hcyBTYXB1dHJhJmJhY2tncm91bmQ9cmFuZG9tIiwiaXNfcGVybWFuZW50IjpmYWxzZSwiaWF0IjoxNjYzODQwNzY0fQ._HrzpinFYX_m9WfvM-lGCdVrnhnaGHhzt1e6eATE1Iw',
        },
      };

      loginMock.mockResolvedValueOnce(mockResponse);

      // Action
      await loginUser(userData)(dispatch, getState);

      // Assert
      expect(dispatch).toHaveBeenCalledWith({
        type: 'auth/login/pending',
        meta: {
          arg: userData,
          requestId: expect.any(String),
          requestStatus: 'pending',
        },
      });

      expect(dispatch).toHaveBeenCalledWith({
        type: 'auth/login/fulfilled',
        payload: mockResponse,
        meta: {
          arg: userData,
          requestId: expect.any(String),
          requestStatus: 'fulfilled',
        },
      });
    });

    it('Should dispatch the correct actions on failed login', async () => {
      // Arrange
      const mockResponse = {
        error: true,
        status: 'failed',
        message: 'Login Failed',
      };

      loginMock.mockRejectedValueOnce(mockResponse);

      // Action
      await loginUser(userData)(dispatch, getState);

      // Assert
      expect(dispatch).toHaveBeenCalledWith({
        type: 'auth/login/pending',
        meta: {
          arg: userData,
          requestId: expect.any(String),
          requestStatus: 'pending',
        },
      });

      expect(dispatch).toHaveBeenCalledWith({
        type: 'auth/login/rejected',
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

  describe('getProfileUser', () => {
    let getProfileMock;
    const mockToken = 'example_token';

    beforeEach(() => {
      getProfileMock = vi.spyOn(userAPI, 'getUserProfile');
    });

    afterEach(() => {
      getProfileMock.mockClear();
    });

    it('Should dispatch the correct actions on successful get profile', async () => {
      // Arrange
      const mockResponse = {
        error: false,
        status: 'success',
        message: 'Get Profile Success',
        data: {
          id: 'john_doe',
          name: 'John Doe',
          email: 'jhonA@example.com',
          avatar: 'https://generated-image-url.jpg',
        },
      };

      getProfileMock.mockResolvedValueOnce(mockResponse);

      // Action
      await getProfileUser({
        headers: { Authorization: `Bearer ${mockToken}` },
      })(dispatch, getState);

      // Assert
      expect(dispatch).toHaveBeenCalledWith({
        type: 'auth/me/pending',
        meta: {
          arg: {
            headers: {
              Authorization: `Bearer ${mockToken}`,
            },
          },
          requestId: expect.any(String),
          requestStatus: 'pending',
        },
      });

      expect(dispatch).toHaveBeenCalledWith({
        type: 'auth/me/fulfilled',
        payload: mockResponse,
        meta: {
          arg: {
            headers: {
              Authorization: `Bearer ${mockToken}`,
            },
          },
          requestId: expect.any(String),
          requestStatus: 'fulfilled',
        },
      });
    });

    it('Should dispatch the correct actions on failed get profile', async () => {
      // Arrange
      const mockResponse = {
        error: true,
        status: 'failed',
        message: 'Get Profile Failed',
      };

      getProfileMock.mockRejectedValueOnce(mockResponse);

      // Action
      await getProfileUser({
        headers: { Authorization: `Bearer ${mockToken}` },
      })(dispatch, getState);

      // Assert
      expect(dispatch).toHaveBeenCalledWith({
        type: 'auth/me/pending',
        meta: {
          arg: {
            headers: {
              Authorization: `Bearer ${mockToken}`,
            },
          },
          requestId: expect.any(String),
          requestStatus: 'pending',
        },
      });

      expect(dispatch).toHaveBeenCalledWith({
        type: 'auth/me/rejected',
        error: {
          message: mockResponse.message,
        },
        meta: {
          arg: {
            headers: {
              Authorization: `Bearer ${mockToken}`,
            },
          },
          aborted: false,
          requestId: expect.any(String),
          requestStatus: 'rejected',
          condition: false,
          rejectedWithValue: false,
        },
      });
    });
  });
});
