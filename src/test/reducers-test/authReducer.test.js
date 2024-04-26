import { expect, it, describe } from 'vitest';
import authReducer, {
  setIsError,
  setMessage,
} from '../../redux/features/auth/authSlice';

/**
 *
 * SKENARIO TESTING
 *
 * Reducer: authReducer
 *
 * - Should return the initial state when no action
 * - Should return a new message
 * - Should return a new isError
 *
 */
describe('Authentication reducers test', () => {
  const initialState = {
    data: null,
    token: null,
    message: null,
    isError: false,
    isLoading: false,
  };

  it('Should return the initial state when no action', () => {
    // Arrange
    const state = undefined;
    const action = {};

    // Action
    const nextState = authReducer(state, action);

    // Assert
    expect(nextState).toEqual(initialState);
  });

  it('Should return a new message', () => {
    // Arrange
    const newMessage = 'Test message';
    const action = setMessage(newMessage);

    // Action
    const nextState = authReducer(initialState, action);

    // Assert
    expect(nextState.message).toEqual(newMessage);
  });

  it('Should return a new isError', () => {
    // Arrange
    const newIsError = true;
    const action = setIsError(newIsError);

    // Action
    const nextState = authReducer(initialState, action);

    // Assert
    expect(nextState.isError).toEqual(newIsError);
  });
});
