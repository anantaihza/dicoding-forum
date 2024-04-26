import { expect, it, describe } from 'vitest';
import commentReducer, {
  setIsError,
  setMessage,
} from '../../redux/features/comment/commentSlice';

/**
 *
 * SKENARIO TESTING
 *
 * Reducer: commentReducer
 *
 * - Should return the initial state when no action
 * - Should return a new message
 * - Should return a new isError
 *
 */
describe('Authentication reducers test', () => {
  const initialState = {
    comments: null,
    message: null,
    isError: false,
    isLoading: false,
  };

  it('Should return the initial state when no action', () => {
    // Arrange
    const state = undefined;
    const action = {};

    // Action
    const nextState = commentReducer(state, action);

    // Assert
    expect(nextState).toEqual(initialState);
  });

  it('Should return a new message', () => {
    // Arrange
    const newMessage = 'Test message';
    const action = setMessage(newMessage);

    // Action
    const nextState = commentReducer(initialState, action);

    // Assert
    expect(nextState.message).toEqual(newMessage);
  });

  it('Should return a new isError', () => {
    // Arrange
    const newIsError = true;
    const action = setIsError(newIsError);

    // Action
    const nextState = commentReducer(initialState, action);

    // Assert
    expect(nextState.isError).toEqual(newIsError);
  });
});
