import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import getUsers from '../../redux/features/users/usersThunk';

import * as userAPI from '../../utils/api/userAPI';

describe('User Thunk', () => {
  let dispatch;
  let getState;
  let getUsersMock;
  const mockResponse = {
    error: false,
    status: 'success',
    message: 'Get Users Success',
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
      {
        id: 'fulan',
        name: 'Si Fulan',
        email: 'fulan@example.com',
        avatar: 'https://generated-image-url.jpg',
      },
    ],
  };

  const mockResponseFail = {
    error: true,
    status: 'Failed',
    message: 'Unable to get users',
    data: null,
  };

  beforeEach(() => {
    dispatch = vi.fn();
    getState = vi.fn();
    getUsersMock = vi.spyOn(userAPI, 'getAllUser');
  });

  afterEach(() => {
    dispatch.mockClear();
    getState.mockClear();
    getUsersMock.mockClear();
  });

  it('Should dispatch the correct actions on successful get users', async () => {
    getUsersMock.mockResolvedValueOnce(mockResponse);

    await getUsers()(dispatch, getState);

    expect(dispatch).toHaveBeenCalledWith({
      type: 'users/getUsers/pending',
      meta: {
        requestId: expect.any(String),
        requestStatus: 'pending',
      },
    });

    expect(dispatch).toHaveBeenCalledWith({
      type: 'users/getUsers/fulfilled',
      payload: mockResponse,
      meta: {
        requestId: expect.any(String),
        requestStatus: 'fulfilled',
      },
    });
  });

  it('Should dispatch the correct actions on failed get users', async () => {
    getUsersMock.mockRejectedValueOnce(mockResponseFail);

    await getUsers()(dispatch, getState);

    expect(dispatch).toHaveBeenCalledWith({
      type: 'users/getUsers/pending',
      meta: {
        requestId: expect.any(String),
        requestStatus: 'pending',
      },
    });

    expect(dispatch).toHaveBeenCalledWith({
      type: 'users/getUsers/rejected',
      error: {
        message: mockResponseFail.message,
      },
      meta: {
        aborted: false,
        condition: false,
        rejectedWithValue: false,
        requestId: expect.any(String),
        requestStatus: 'rejected',
      },
    });
  });
});
