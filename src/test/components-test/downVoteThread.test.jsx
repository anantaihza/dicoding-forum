import React from 'react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { cleanup, render, screen } from '@testing-library/react';
import * as matchers from '@testing-library/jest-dom/matchers';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import { toast } from 'react-toastify';
import DownVoteThread from '../../view/components/common/icon/DownVoteThread';
import {
  downVote,
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
  downVote: vi.fn(),
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

describe('DownVoteThread Component', () => {
  const countDown = 30;

  beforeEach(() => {
    useDispatch.mockReturnValue(vi.fn());
    useParams.mockReturnValue({ id: 'thread-1' });
  });

  afterEach(() => {
    vi.clearAllMocks();
    cleanup();
  });

  it('should renders downvote icon and count when not logged in', () => {
    getAccessToken.mockReturnValue(null);

    render(<DownVoteThread idThread="thread-1" countDown={countDown} />);

    const downvoteIcon = screen.getByTestId('downvote-icon');
    const countText = screen.getByText(countDown.toString());

    expect(downvoteIcon).toBeInTheDocument();
    expect(countText).toBeInTheDocument();
  });

  it('should handle downvote thread when logged in', async () => {
    getAccessToken.mockReturnValue('example_token');

    neutralizeVote.mockResolvedValue({
      payload: {
        status: 'success',
      },
    });
    useDispatch.mockReturnValue(neutralizeVote);

    downVote.mockResolvedValue({
      payload: {
        status: 'success',
      },
    });
    useDispatch.mockReturnValue(downVote);

    render(
      <DownVoteThread
        idThread="thread-1"
        countDown={countDown}
        isUpActive={false}
        isDownActive={false}
      />
    );

    const downvoteIcon = screen.getByTestId('downvote-icon');
    const buttonDown = screen.getByRole('button');
    const countText = screen.getByText(countDown.toString());

    await userEvent.click(buttonDown);

    expect(downvoteIcon).toBeInTheDocument();
    expect(buttonDown).toBeInTheDocument();
    expect(countText).toBeInTheDocument();
    expect(neutralizeVote).toHaveBeenCalled({
      threadId: 'thread-1',
    });
    expect(downVote).toHaveBeenCalled({
      threadId: 'thread-1',
    });

    expect(toast.info).toHaveBeenCalled('Berhasil memberikan dislike');
  });

  it('should handle downvote thread when logged in, upvote is active', async () => {
    getAccessToken.mockReturnValue('example_token');

    neutralizeVote.mockResolvedValue({
      payload: {
        status: 'success',
      },
    });
    useDispatch.mockReturnValue(neutralizeVote);

    downVote.mockResolvedValue({
      payload: {
        status: 'success',
      },
    });
    useDispatch.mockReturnValue(downVote);

    render(
      <DownVoteThread
        idThread="thread-1"
        countDown={countDown}
        isUpActive
        isDownActive={false}
      />
    );

    const downvoteIcon = screen.getByTestId('downvote-icon');
    const buttonDown = screen.getByRole('button');
    const countText = screen.getByText(countDown.toString());

    await userEvent.click(buttonDown);

    expect(downvoteIcon).toBeInTheDocument();
    expect(buttonDown).toBeInTheDocument();
    expect(countText).toBeInTheDocument();
    expect(neutralizeVote).toHaveBeenCalled({
      threadId: 'thread-1',
    });
    expect(downVote).toHaveBeenCalled({
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
      <DownVoteThread
        idThread="thread-1"
        countDown={countDown}
        isUpActive={false}
        isDownActive
      />
    );

    const downvoteIcon = screen.getByTestId('downvote-icon');
    const buttonDown = screen.getByRole('button');
    const countText = screen.getByText(countDown.toString());

    await userEvent.click(buttonDown);

    expect(downvoteIcon).toBeInTheDocument();
    expect(buttonDown).toBeInTheDocument();
    expect(countText).toBeInTheDocument();
    expect(neutralizeVote).toHaveBeenCalled({
      threadId: 'thread-1',
    });
  });
});
