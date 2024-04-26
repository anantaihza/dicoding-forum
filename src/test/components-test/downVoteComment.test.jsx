import React from 'react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { cleanup, render, screen } from '@testing-library/react';
import * as matchers from '@testing-library/jest-dom/matchers';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import { toast } from 'react-toastify';
import DownVoteComment from '../../view/components/common/icon/DownVoteComment';
import {
  downVote,
  neutralizeVote,
} from '../../redux/features/voteComment/voteCommentThunk';
import { getAccessToken } from '../../utils/api/userAPI';

expect.extend(matchers);

vi.mock('react-redux', () => ({
  useSelector: vi.fn(),
  useDispatch: vi.fn(),
}));

vi.mock('react-toastify', () => ({
  toast: {
    info: vi.fn(),
  },
}));

vi.mock('../../redux/features/voteComment/voteCommentThunk', () => ({
  downVote: vi.fn(),
  neutralizeVote: vi.fn(),
}));

vi.mock('react-router-dom', () => ({
  useNavigate: vi.fn(),
  // eslint-disable-next-line react/jsx-props-no-spreading, react/prop-types
  Link: ({ children, ...props }) => <a {...props}>{children}</a>,
  useParams: vi.fn(),
}));

vi.mock('../../utils/api/userAPI', () => ({
  getAccessToken: vi.fn(),
}));

/**
 *
 * SKENARIO TESTING
 *
 * Component: DownVoteComment
 *
 *   - Should renders downvote icon and count when not logged in
 *   - Should downvotes comment when logged in and dispatches downVote thunk
 *   - Should downvotes comment when logged in, upVote is active and dispatches downVote thunk
 *   - Should neutralizes comment when logged in and dispatches neutralizeVote thunk
 *
 */

describe('DownVoteComment Component', () => {
  const idComment = 'comment-1';
  const idThread = useParams.id;
  const countDown = 10;

  beforeEach(() => {
    useDispatch.mockReturnValue(vi.fn());
    useParams.mockReturnValue({ id: 'thread-1' });
  });

  afterEach(() => {
    vi.clearAllMocks();
    cleanup();
  });

  it('Should renders downvote icon and count when not logged in', () => {
    // Arrange
    getAccessToken.mockReturnValue(null);
    render(<DownVoteComment idComment={idComment} countDown={countDown} />);

    const downVoteIcon = screen.getByTestId('down-vote-icon');
    const countText = screen.getByText(countDown.toString());

    // Assert
    expect(downVoteIcon).toBeInTheDocument();
    expect(countText).toBeInTheDocument();
  });

  it('Should downvotes comment when logged in and dispatches downVote thunk', async () => {
    // Arrange
    getAccessToken.mockReturnValue('example_token');

    neutralizeVote.mockResolvedValue({ payload: { status: 'success' } });
    useDispatch.mockReturnValue(neutralizeVote);

    downVote.mockResolvedValue({ payload: { status: 'success' } });
    useDispatch.mockReturnValue(downVote);

    render(
      <DownVoteComment
        idComment={idComment}
        countDown={countDown}
        isUpActive={false}
        isDownActive={false}
      />
    );

    const downVoteIcon = screen.getByTestId('down-vote-icon');
    const buttonDown = screen.getByRole('button');
    const countText = screen.getByText(countDown.toString());

    // Action
    await userEvent.click(buttonDown);

    // Assert
    expect(downVoteIcon).toBeInTheDocument();
    expect(buttonDown).toBeInTheDocument();
    expect(countText).toBeInTheDocument();
    expect(neutralizeVote).toHaveBeenCalled({
      threadId: idThread,
      commentId: idComment,
    });
    expect(downVote).toHaveBeenCalled({
      threadId: idThread,
      commentId: idComment,
    });
    expect(toast.info).toHaveBeenCalledWith(
      'Berhasil memberikan dislike pada komentar'
    );
  });

  it('Should downvotes comment when logged in, upVote is active and dispatches downVote thunk', async () => {
    // Arrange
    getAccessToken.mockReturnValue('example_token');

    neutralizeVote.mockResolvedValue({ payload: { status: 'success' } });
    useDispatch.mockReturnValue(neutralizeVote);

    downVote.mockResolvedValue({ payload: { status: 'success' } });
    useDispatch.mockReturnValue(downVote);

    render(
      <DownVoteComment
        idComment={idComment}
        countDown={countDown}
        isUpActive
        isDownActive={false}
      />
    );

    const downVoteIcon = screen.getByTestId('down-vote-icon');
    const buttonDown = screen.getByRole('button');
    const countText = screen.getByText(countDown.toString());

    // Action
    await userEvent.click(buttonDown);

    // Assert
    expect(downVoteIcon).toBeInTheDocument();
    expect(buttonDown).toBeInTheDocument();
    expect(countText).toBeInTheDocument();
    expect(neutralizeVote).toHaveBeenCalled({
      threadId: idThread,
      commentId: idComment,
    });
    expect(downVote).toHaveBeenCalled({
      threadId: idThread,
      commentId: idComment,
    });
    expect(toast.info).toHaveBeenCalledWith(
      'Berhasil memberikan dislike pada komentar'
    );
  });

  it('Should neutralizes comment when logged in and dispatches neutralizeVote thunk', async () => {
    // Arrange
    getAccessToken.mockReturnValue('example_token');

    neutralizeVote.mockResolvedValue({ payload: { status: 'success' } });
    useDispatch.mockReturnValue(neutralizeVote);

    render(
      <DownVoteComment
        idComment={idComment}
        countDown={countDown}
        isUpActive={false}
        isDownActive
      />
    );

    const downVoteIcon = screen.getByTestId('down-vote-icon');
    const buttonDown = screen.getByRole('button');
    const countText = screen.getByText(countDown.toString());

    // Action
    await userEvent.click(buttonDown);

    // Assert
    expect(downVoteIcon).toBeInTheDocument();
    expect(buttonDown).toBeInTheDocument();
    expect(countText).toBeInTheDocument();
    expect(neutralizeVote).toHaveBeenCalled({
      threadId: idThread,
      commentId: idComment,
    });
  });
});
