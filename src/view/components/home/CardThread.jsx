import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PropType from 'prop-types';
import parser from 'html-react-parser';
import { useDispatch, useSelector } from 'react-redux';
import { getProfileUser } from '../../../redux/features/auth/authThunk';
import UpVoteThread from '../common/icon/UpVoteThread';
import DownVoteThread from '../common/icon/DownVoteThread';
import Discussion from '../common/icon/Discussion';
import getTimeAgo from '../../../utils/timeAgo';
import getProfileUserThread from '../../../utils/profileUser';
import { summaryVote, isMyIdVote } from '../../../utils/countVote';
import { getAccessToken } from '../../../utils/api/userAPI';

export default function CardThread({ thread }) {
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.users);
  const myProfile = useSelector((state) => state.auth.data);
  const profile = getProfileUserThread(users, thread?.ownerId);

  // state for controlled component
  const [isUpVoteActive, setIsUpVoteActive] = useState(false);
  const [isDownVoteActive, setIsDownVoteActive] = useState(false);
  const [countUp, setCountUp] = useState(0);
  const [countDown, setCountDown] = useState(0);

  useEffect(() => {
    if (getAccessToken() !== null) {
      dispatch(getProfileUser());
    }
  }, [dispatch]);

  useEffect(() => {
    setIsUpVoteActive(isMyIdVote(myProfile?.id, thread?.upVotesBy));
    setIsDownVoteActive(isMyIdVote(myProfile?.id, thread?.downVotesBy));
    setCountUp(summaryVote(thread?.upVotesBy));
    setCountDown(summaryVote(thread?.downVotesBy));
  }, [thread, myProfile]);

  return (
    <div className="card card-thread p-2 w-full grow bg-white my-8 transition ease-in-out delay-100 hover:-translate-y-1 hover:scale-105 duration-300 hover:shadow-xl-primary">
      <div className="card-body flex flex-col md:flex-row gap-10">
        {profile ? (
          <div className="avatar">
            <div className="w-16 h-16 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
              <img src={profile?.avatar} alt={profile?.name} />
            </div>
          </div>
        ) : (
          <div className="avatar placeholder">
            <div className="bg-neutral text-neutral-content rounded-full w-16 h-16">
              <span className="loading loading-dots loading-lg" />
            </div>
          </div>
        )}
        <div className="grow">
          <Link to={`/detail/${thread?.id}`}>
            <div className="flex justify-start gap-x-3 gap-y-0 items-start md:item-center flex-wrap flex-col lg:flex-row">
              <h3 className="md:max-w-80 lg:max-w-96 md:truncate text-primary text-lg poppins-bold">
                {thread?.title}{' '}
              </h3>
              <p className="text-accent">#{thread.category}</p>
              <p className="text-accent justify-self-end text-start md:text-end">
                {getTimeAgo(thread?.createdAt)}
              </p>
            </div>
            <div className="my-3 text-neutral h-fit max-h-60 overflow-hidden text-clip">
              {parser(thread?.body)}
            </div>
          </Link>
          <div className="mt-6 flex gap-5 flex-wrap">
            {getAccessToken() === null ? (
              <>
                <UpVoteThread idThread={thread?.id} countUp={countUp} />
                <DownVoteThread idThread={thread?.id} countDown={countDown} />
              </>
            ) : (
              <>
                <UpVoteThread
                  idThread={thread?.id}
                  countUp={countUp}
                  isUpActive={isUpVoteActive}
                  isDownActive={isDownVoteActive}
                  setUp={setIsUpVoteActive}
                  setDown={setIsDownVoteActive}
                  setCountUp={setCountUp}
                  setCountDown={setCountDown}
                />
                <DownVoteThread
                  idThread={thread?.id}
                  countDown={countDown}
                  isUpActive={isUpVoteActive}
                  isDownActive={isDownVoteActive}
                  setUp={setIsUpVoteActive}
                  setDown={setIsDownVoteActive}
                  setCountUp={setCountUp}
                  setCountDown={setCountDown}
                />
              </>
            )}
            <Discussion count={thread?.totalComments} />
            <p className="justify-self-end text-start md:text-end text-accent">
              Dibuat oleh <b className="text-neutral">{profile?.name}</b>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

CardThread.propTypes = {
  /**
   * Data thread
   */
  thread: PropType.object.isRequired,
};
