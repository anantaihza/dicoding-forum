import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import addComment from '../../redux/features/comment/commentThunk';

import * as commentAPI from '../../utils/api/commentAPI';

describe('Comment Thunk', () => {
  let dispatch;
  let getState;
  let getCommentMock;
  const userData = {
    threadId: 'thread-1',
    content: 'Ini adalah komentar pertama',
  };
  const mockToken = 'example_token';
  const mockResponse = {
    error: false,
    status: 'success',
    message: 'Add Comment Success',
    data: {
      id: 'comment-1',
      content: 'Ini adalah komentar pertama',
      createdAt: '2021-06-21T07:00:00.000Z',
      upVotesBy: [],
      downVotesBy: [],
      owner: {
        id: 'users-1',
        name: 'John Doe',
        email: 'john@example.com',
      },
    },
  };
  const mockResponseFail = {
    error: true,
    status: 'Failed',
    message: 'Unable to add comment',
    data: null,
  };

  beforeEach(() => {
    dispatch = vi.fn();
    getState = vi.fn();
    getCommentMock = vi.spyOn(commentAPI, 'createComment');
  });

  afterEach(() => {
    dispatch.mockClear();
    getState.mockClear();
    getCommentMock.mockClear();
  });

  it('Should dispatch the correct actions on successful add comment', async () => {
    getCommentMock.mockResolvedValueOnce(mockResponse);

    await addComment(userData, {
      headers: { Authorization: `Bearer ${mockToken}` },
    })(dispatch, getState);

    expect(dispatch).toHaveBeenCalledWith({
      type: 'comment/addComment/pending',
      meta: {
        arg: userData,
        requestId: expect.any(String),
        requestStatus: 'pending',
      },
    });

    expect(dispatch).toHaveBeenCalledWith({
      type: 'comment/addComment/fulfilled',
      payload: mockResponse,
      meta: {
        arg: userData,
        requestId: expect.any(String),
        requestStatus: 'fulfilled',
      },
    });
  });

  it('Should dispatch the correct actions on failed add comment', async () => {
    getCommentMock.mockRejectedValueOnce(mockResponseFail);

    await addComment(userData, {
      headers: { Authorization: `Bearer ${mockToken}` },
    })(dispatch, getState);

    expect(dispatch).toHaveBeenCalledWith({
      type: 'comment/addComment/pending',
      meta: {
        arg: userData,
        requestId: expect.any(String),
        requestStatus: 'pending',
      },
    });

    expect(dispatch).toHaveBeenCalledWith({
      type: 'comment/addComment/rejected',
      error: {
        message: mockResponseFail.message,
      },
      meta: {
        arg: userData,
        aborted: false,
        condition: false,
        rejectedWithValue: false,
        requestId: expect.any(String),
        requestStatus: 'rejected',
      },
    });
  });
});
