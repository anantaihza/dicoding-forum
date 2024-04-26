import React from 'react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { cleanup, render, screen } from '@testing-library/react';
import * as matchers from '@testing-library/jest-dom/matchers';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import { toast } from 'react-toastify';
import UpVoteComment from '../../view/components/common/icon/UpVoteComment';
import {
  upVote,
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
  upVote: vi.fn(),
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
 * Component: UpVoteComment
 *
 *  - Should renders upvote icon and count when not logged in
 *  - Should upvotes comment when logged in and dispatches upVote thunk
 *  - Should upvotes comment when logged in, downVote is active and dispatches upVote thunk
 *  - Should neutralizes comment when logged in and dispatches neutralizeVote thunk
 *
 */
describe('UpVoteComment Component', () => {
  const idComment = 'comment-1';
  const idThread = useParams.id;
  const countUp = 20;

  beforeEach(() => {
    useDispatch.mockReturnValue(vi.fn());
    useParams.mockReturnValue({ id: 'thread-1' });
  });

  afterEach(() => {
    vi.clearAllMocks();
    cleanup();
  });

  it('Should renders upvote icon and count when not logged in', () => {
    // Arrange
    getAccessToken.mockReturnValue(null);
    render(<UpVoteComment idComment={idComment} countUp={countUp} />);

    const upVoteIcon = screen.getByTestId('up-vote-icon');
    const countText = screen.getByText(countUp.toString());

    // Assert
    expect(upVoteIcon).toBeInTheDocument();
    expect(countText).toBeInTheDocument();
  });

  it('Should upvotes comment when logged in and dispatches upVote thunk', async () => {
    // Arrange
    getAccessToken.mockReturnValue('example_token');

    neutralizeVote.mockResolvedValue({ payload: { status: 'success' } });
    useDispatch.mockReturnValue(neutralizeVote);

    upVote.mockResolvedValue({ payload: { status: 'success' } });
    useDispatch.mockReturnValue(upVote);

    render(
      <UpVoteComment
        idComment={idComment}
        countUp={countUp}
        isUpActive={false}
        isDownActive={false}
      />
    );

    const upVoteIcon = screen.getByTestId('up-vote-icon');
    const buttonDown = screen.getByRole('button');
    const countText = screen.getByText(countUp.toString());

    // Action
    await userEvent.click(buttonDown);

    // Assert
    expect(upVoteIcon).toBeInTheDocument();
    expect(buttonDown).toBeInTheDocument();
    expect(countText).toBeInTheDocument();
    expect(neutralizeVote).toHaveBeenCalled({
      threadId: idThread,
      commentId: idComment,
    });
    expect(upVote).toHaveBeenCalled({
      threadId: idThread,
      commentId: idComment,
    });
    expect(toast.info).toHaveBeenCalledWith(
      'Berhasil memberikan like pada komentar'
    );
  });

  it('Should upvotes comment when logged in, downVote is active and dispatches upVote thunk', async () => {
    // Arrange
    getAccessToken.mockReturnValue('example_token');

    neutralizeVote.mockResolvedValue({ payload: { status: 'success' } });
    useDispatch.mockReturnValue(neutralizeVote);

    upVote.mockResolvedValue({ payload: { status: 'success' } });
    useDispatch.mockReturnValue(upVote);

    render(
      <UpVoteComment
        idComment={idComment}
        countUp={countUp}
        isUpActive={false}
        isDownActive
      />
    );

    const upVoteIcon = screen.getByTestId('up-vote-icon');
    const buttonDown = screen.getByRole('button');
    const countText = screen.getByText(countUp.toString());

    // Action
    await userEvent.click(buttonDown);

    // Assert
    expect(upVoteIcon).toBeInTheDocument();
    expect(buttonDown).toBeInTheDocument();
    expect(countText).toBeInTheDocument();
    expect(neutralizeVote).toHaveBeenCalled({
      threadId: idThread,
      commentId: idComment,
    });
    expect(upVote).toHaveBeenCalled({
      threadId: idThread,
      commentId: idComment,
    });
    expect(toast.info).toHaveBeenCalledWith(
      'Berhasil memberikan like pada komentar'
    );
  });

  it('Should neutralizes comment when logged in and dispatches neutralizeVote thunk', async () => {
    // Arrange
    getAccessToken.mockReturnValue('example_token');

    neutralizeVote.mockResolvedValue({ payload: { status: 'success' } });
    useDispatch.mockReturnValue(neutralizeVote);

    render(
      <UpVoteComment
        idComment={idComment}
        countUp={countUp}
        isUpActive
        isDownActive={false}
      />
    );

    const upVoteIcon = screen.getByTestId('up-vote-icon');
    const buttonDown = screen.getByRole('button');
    const countText = screen.getByText(countUp.toString());

    // Action
    await userEvent.click(buttonDown);

    // Assert
    expect(upVoteIcon).toBeInTheDocument();
    expect(buttonDown).toBeInTheDocument();
    expect(countText).toBeInTheDocument();
    expect(neutralizeVote).toHaveBeenCalled({
      threadId: idThread,
      commentId: idComment,
    });
  });
});
