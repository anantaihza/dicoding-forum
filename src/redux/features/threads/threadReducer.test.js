import { expect, it, describe } from 'vitest';
import threadReducer, { setIsError, setMessage } from './threadsSlice';

describe('Thread reducers test', () => {
  const initialState = {
    datas: null,
    dataDetail: null,
    dataCreate: null,
    message: null,
    isError: false,
    isLoading: true,
  };

  it('Should return the initial state when no action', () => {
    // Arrange
    const state = undefined;
    const action = {};

    // Action
    const nextState = threadReducer(state, action);

    // Assert
    expect(nextState).toEqual(initialState);
  });

  it('Should return a new message', () => {
    // Arrange
    const newMessage = 'Test message';
    const action = setMessage(newMessage);

    // Action
    const nextState = threadReducer(initialState, action);

    // Assert
    expect(nextState.message).toEqual(newMessage);
  });

  it('Should return a new isError', () => {
    // Arrange
    const newIsError = true;
    const action = setIsError(newIsError);

    // Action
    const nextState = threadReducer(initialState, action);

    // Assert
    expect(nextState.isError).toEqual(newIsError);
  });
});
