import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import getCategories from '../../redux/features/categories/categoriesThunk';

// getAllThread
import * as threadAPI from '../../utils/api/threadAPI';

describe('Categories Thunk', () => {
  let dispatch;
  let getState;
  let getThreadMock;
  const mockThreadData = {
    error: false,
    status: 'success',
    message: 'Get Thread Success',
    data: [
      {
        id: 'thread-1',
        title: 'Thread Pertama',
        body: 'Ini adalah thread pertama',
        category: 'General',
        createdAt: '2021-06-21T07:00:00.000Z',
        ownerId: 'users-1',
        upVotesBy: [],
        downVotesBy: [],
        totalComments: 0,
      },
      {
        id: 'thread-2',
        title: 'Thread Kedua',
        body: 'Ini adalah thread kedua',
        category: 'Tech',
        createdAt: '2021-06-21T07:00:00.000Z',
        ownerId: 'users-2',
        upVotesBy: [],
        downVotesBy: [],
        totalComments: 0,
      },
    ],
  };
  const mockThreadDataFail = {
    error: true,
    status: 'Failed',
    message: 'Unable to get categories',
    data: null,
  };

  const mockResponse = { data: ['General', 'Tech'] };

  beforeEach(() => {
    dispatch = vi.fn();
    getState = vi.fn();
    getThreadMock = vi.spyOn(threadAPI, 'getAllThread');
  });

  afterEach(() => {
    dispatch.mockClear();
    getState.mockClear();
    getThreadMock.mockClear();
  });

  it('Should dispatch the correct actions on successful getCategories', async () => {
    getThreadMock.mockResolvedValueOnce(mockThreadData);

    await getCategories()(dispatch, getState);

    expect(dispatch).toHaveBeenCalledWith({
      type: 'categories/getCategories/pending',
      meta: {
        requestId: expect.any(String),
        requestStatus: 'pending',
      },
    });

    expect(dispatch).toHaveBeenCalledWith({
      type: 'categories/getCategories/fulfilled',
      payload: mockResponse,
      meta: {
        requestId: expect.any(String),
        requestStatus: 'fulfilled',
      },
    });
  });

  it('Should dispatch the correct actions on failed getCategories', async () => {
    getThreadMock.mockRejectedValueOnce(mockThreadDataFail);

    await getCategories()(dispatch, getState);

    expect(dispatch).toHaveBeenCalledWith({
      type: 'categories/getCategories/pending',
      meta: {
        requestId: expect.any(String),
        requestStatus: 'pending',
      },
    });

    expect(dispatch).toHaveBeenCalledWith({
      type: 'categories/getCategories/rejected',
      error: {
        message: mockThreadDataFail.message,
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
