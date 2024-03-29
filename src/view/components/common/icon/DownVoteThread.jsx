import React from 'react';
import PropType from 'prop-types';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getAccessToken } from '../../../../utils/api/userAPI';
import {
  downVote,
  neutralizeVote,
} from '../../../../redux/features/voteThread/voteThreadThunk';
import { getThreads } from '../../../../redux/features/threads/threadsThunk';

export default function DownVoteThread({
  idThread,
  countDown,
  isUpActive,
  isDownActive,
  setUp,
  setDown,
  setCountUp,
  setCountDown,
}) {
  const dispatch = useDispatch();

  const neutralizeVoteHandler = async () => {
    setDown(false);
    setCountDown((prevCount) => prevCount - 1);
    if (getAccessToken() !== null) {
      try {
        await dispatch(neutralizeVote(idThread));
        await dispatch(getThreads());
      } catch (error) {
        setDown(true);
        setCountDown((prevCount) => prevCount + 1);
        toast.error(error.message);
      }
    }
  };

  const downVoteHandler = async () => {
    setDown(true);
    setCountDown((prevCount) => prevCount + 1);
    if (isUpActive) {
      setUp(false);
      setCountUp((prevCount) => prevCount - 1);
    }
    if (getAccessToken() !== null) {
      try {
        await dispatch(neutralizeVote(idThread));
        await dispatch(downVote(idThread));
        await dispatch(getThreads());
        toast.info('Berhasil memberikan dislike');
      } catch (error) {
        setDown(false);
        setCountDown((prevCount) => prevCount - 1);
        if (isUpActive === true && isDownActive === false) {
          setUp(true);
          setCountUp((prevCount) => prevCount + 1);
        }
        toast.error(error.message);
      }
    }
  };

  if (getAccessToken() === null) {
    return (
      <div className="flex items-center gap-2">
        <Link to="/login" aria-label="downvote" className="hover:text-primary">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M7.498 15.25H4.372c-1.026 0-1.945-.694-2.054-1.715a12.137 12.137 0 0 1-.068-1.285c0-2.848.992-5.464 2.649-7.521C5.287 4.247 5.886 4 6.504 4h4.016a4.5 4.5 0 0 1 1.423.23l3.114 1.04a4.5 4.5 0 0 0 1.423.23h1.294M7.498 15.25c.618 0 .991.724.725 1.282A7.471 7.471 0 0 0 7.5 19.75 2.25 2.25 0 0 0 9.75 22a.75.75 0 0 0 .75-.75v-.633c0-.573.11-1.14.322-1.672.304-.76.93-1.33 1.653-1.715a9.04 9.04 0 0 0 2.86-2.4c.498-.634 1.226-1.08 2.032-1.08h.384m-10.253 1.5H9.7m8.075-9.75c.01.05.027.1.05.148.593 1.2.925 2.55.925 3.977 0 1.487-.36 2.89-.999 4.125m.023-8.25c-.076-.365.183-.75.575-.75h.908c.889 0 1.713.518 1.972 1.368.339 1.11.521 2.287.521 3.507 0 1.553-.295 3.036-.831 4.398-.306.774-1.086 1.227-1.918 1.227h-1.053c-.472 0-.745-.556-.5-.96a8.95 8.95 0 0 0 .303-.54"
            />
          </svg>
        </Link>
        <p>{countDown}</p>
      </div>
    );
  }

  if (isDownActive) {
    return (
      <div className="flex items-center gap-2">
        <button
          type="button"
          aria-label="downvote"
          className="hover:text-primary"
          onClick={neutralizeVoteHandler}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-5 h-5 text-red-500"
          >
            <path d="M15.73 5.5h1.035A7.465 7.465 0 0 1 18 9.625a7.465 7.465 0 0 1-1.235 4.125h-.148c-.806 0-1.534.446-2.031 1.08a9.04 9.04 0 0 1-2.861 2.4c-.723.384-1.35.956-1.653 1.715a4.499 4.499 0 0 0-.322 1.672v.633A.75.75 0 0 1 9 22a2.25 2.25 0 0 1-2.25-2.25c0-1.152.26-2.243.723-3.218.266-.558-.107-1.282-.725-1.282H3.622c-1.026 0-1.945-.694-2.054-1.715A12.137 12.137 0 0 1 1.5 12.25c0-2.848.992-5.464 2.649-7.521C4.537 4.247 5.136 4 5.754 4H9.77a4.5 4.5 0 0 1 1.423.23l3.114 1.04a4.5 4.5 0 0 0 1.423.23ZM21.669 14.023c.536-1.362.831-2.845.831-4.398 0-1.22-.182-2.398-.52-3.507-.26-.85-1.084-1.368-1.973-1.368H19.1c-.445 0-.72.498-.523.898.591 1.2.924 2.55.924 3.977a8.958 8.958 0 0 1-1.302 4.666c-.245.403.028.959.5.959h1.053c.832 0 1.612-.453 1.918-1.227Z" />
          </svg>
        </button>
        <p>{countDown}</p>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <button
        type="button"
        aria-label="downvote"
        className="hover:text-primary"
        onClick={downVoteHandler}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-5 h-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M7.498 15.25H4.372c-1.026 0-1.945-.694-2.054-1.715a12.137 12.137 0 0 1-.068-1.285c0-2.848.992-5.464 2.649-7.521C5.287 4.247 5.886 4 6.504 4h4.016a4.5 4.5 0 0 1 1.423.23l3.114 1.04a4.5 4.5 0 0 0 1.423.23h1.294M7.498 15.25c.618 0 .991.724.725 1.282A7.471 7.471 0 0 0 7.5 19.75 2.25 2.25 0 0 0 9.75 22a.75.75 0 0 0 .75-.75v-.633c0-.573.11-1.14.322-1.672.304-.76.93-1.33 1.653-1.715a9.04 9.04 0 0 0 2.86-2.4c.498-.634 1.226-1.08 2.032-1.08h.384m-10.253 1.5H9.7m8.075-9.75c.01.05.027.1.05.148.593 1.2.925 2.55.925 3.977 0 1.487-.36 2.89-.999 4.125m.023-8.25c-.076-.365.183-.75.575-.75h.908c.889 0 1.713.518 1.972 1.368.339 1.11.521 2.287.521 3.507 0 1.553-.295 3.036-.831 4.398-.306.774-1.086 1.227-1.918 1.227h-1.053c-.472 0-.745-.556-.5-.96a8.95 8.95 0 0 0 .303-.54"
          />
        </svg>
      </button>
      <p>{countDown}</p>
    </div>
  );
}

DownVoteThread.propTypes = {
  idThread: PropType.string.isRequired,
  countDown: PropType.number.isRequired,
  isUpActive: PropType.bool,
  isDownActive: PropType.bool,
  setUp: PropType.func,
  setDown: PropType.func,
  setCountUp: PropType.func,
  setCountDown: PropType.func,
};

DownVoteThread.defaultProps = {
  isUpActive: false,
  isDownActive: false,
  setUp: () => {},
  setDown: () => {},
  setCountUp: () => {},
  setCountDown: () => {},
};
