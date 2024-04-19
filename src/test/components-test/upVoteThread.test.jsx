import React from 'react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { cleanup, render, screen } from '@testing-library/react';
import * as matchers from '@testing-library/jest-dom/matchers';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import { toast } from 'react-toastify';
import UpVoteThread from '../../view/components/common/icon/UpVoteThread';
import {
  upVote,
  neutralizeVote,
} from '../../redux/features/voteThread/voteThreadThunk';
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

vi.mock('../../redux/features/voteThread/voteThreadThunk', () => ({
  upVote: vi.fn(),
  neutralizeVote: vi.fn(),
}));

vi.mock('react-router-dom', () => ({
  // eslint-disable-next-line react/jsx-props-no-spreading, react/prop-types
  Link: ({ children, ...props }) => <a {...props}>{children}</a>,
  useNavigate: vi.fn(),
  useParams: vi.fn(),
}));

vi.mock('../../utils/api/userAPI', () => ({
  getAccessToken: vi.fn(),
}));

describe('UpVoteThread Component', () => {
  const countUp = 30;

  beforeEach(() => {
    useDispatch.mockReturnValue(vi.fn());
    useParams.mockReturnValue({ id: 'thread-1' });
  });

  afterEach(() => {
    vi.clearAllMocks();
    cleanup();
  });

  it('should renders upvote icon and count when not logged in', () => {
    getAccessToken.mockReturnValue(null);

    render(<UpVoteThread idThread="thread-1" countUp={countUp} />);

    const upvoteIcon = screen.getByTestId('upvote-icon');
    const countText = screen.getByText(countUp.toString());

    expect(upvoteIcon).toBeInTheDocument();
    expect(countText).toBeInTheDocument();
  });

  it('should handle upvote thread when logged in', async () => {
    getAccessToken.mockReturnValue('example_token');

    neutralizeVote.mockResolvedValue({
      payload: {
        status: 'success',
      },
    });
    useDispatch.mockReturnValue(neutralizeVote);

    upVote.mockResolvedValue({
      payload: {
        status: 'success',
      },
    });
    useDispatch.mockReturnValue(upVote);

    render(
      <UpVoteThread
        idThread="thread-1"
        countUp={countUp}
        isUpActive={false}
        isDownActive={false}
      />
    );

    const upvoteIcon = screen.getByTestId('upvote-icon');
    const buttonDown = screen.getByRole('button');
    const countText = screen.getByText(countUp.toString());

    await userEvent.click(buttonDown);

    expect(upvoteIcon).toBeInTheDocument();
    expect(buttonDown).toBeInTheDocument();
    expect(countText).toBeInTheDocument();
    expect(neutralizeVote).toHaveBeenCalled({
      threadId: 'thread-1',
    });
    expect(upVote).toHaveBeenCalled({
      threadId: 'thread-1',
    });

    expect(toast.info).toHaveBeenCalled('Berhasil memberikan dislike');
  });

  it('should handle upvote thread when logged in, downvote is active', async () => {
    getAccessToken.mockReturnValue('example_token');

    neutralizeVote.mockResolvedValue({
      payload: {
        status: 'success',
      },
    });
    useDispatch.mockReturnValue(neutralizeVote);

    upVote.mockResolvedValue({
      payload: {
        status: 'success',
      },
    });
    useDispatch.mockReturnValue(upVote);

    render(
      <UpVoteThread
        idThread="thread-1"
        countUp={countUp}
        isUpActive={false}
        isDownActive
      />
    );

    const upvoteIcon = screen.getByTestId('upvote-icon');
    const buttonDown = screen.getByRole('button');
    const countText = screen.getByText(countUp.toString());

    await userEvent.click(buttonDown);

    expect(upvoteIcon).toBeInTheDocument();
    expect(buttonDown).toBeInTheDocument();
    expect(countText).toBeInTheDocument();
    expect(neutralizeVote).toHaveBeenCalled({
      threadId: 'thread-1',
    });
    expect(upVote).toHaveBeenCalled({
      threadId: 'thread-1',
    });

    expect(toast.info).toHaveBeenCalled('Berhasil memberikan dislike');
  });

  it('should handle neutralize vote when logged in', async () => {
    getAccessToken.mockReturnValue('example_token');

    neutralizeVote.mockResolvedValue({
      payload: {
        status: 'success',
      },
    });
    useDispatch.mockReturnValue(neutralizeVote);

    render(
      <UpVoteThread
        idThread="thread-1"
        countUp={countUp}
        isUpActive
        isDownActive={false}
      />
    );

    const upvoteIcon = screen.getByTestId('upvote-icon');
    const buttonDown = screen.getByRole('button');
    const countText = screen.getByText(countUp.toString());

    await userEvent.click(buttonDown);

    expect(upvoteIcon).toBeInTheDocument();
    expect(buttonDown).toBeInTheDocument();
    expect(countText).toBeInTheDocument();
    expect(neutralizeVote).toHaveBeenCalled({
      threadId: 'thread-1',
    });
  });
});
