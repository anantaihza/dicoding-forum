import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropType from 'prop-types';
import parser from 'html-react-parser';
import { useDispatch, useSelector } from 'react-redux';
import { getProfileUser } from '../../../redux/features/auth/authThunk';
// import getUsers from '../../../redux/features/users/usersThunk';
import UpVote from '../common/icon/UpVote';
import DownVote from '../common/icon/DownVote';
import Discussion from '../common/icon/Discussion';
import getTimeAgo from '../../../utils/timeAgo';
import getProfileUserThread from '../../../utils/profileUser';
import { summaryVote, isMyIdVote } from '../../../utils/countVote';
import { getAccessToken } from '../../../utils/api/userAPI';

export default function CardThread({ thread }) {
  const dispatch = useDispatch();
  const myProfile = useSelector((state) => state.auth.data);
  const { users } = useSelector((state) => state.users);

  useEffect(() => {
    // dispatch(getUsers());
    if (getAccessToken() !== null) {
      dispatch(getProfileUser());
    }
  }, [dispatch]);

  const profile = getProfileUserThread(users, thread.ownerId);

  return (
    <div className="card p-2 w-full bg-white my-8 transition ease-in-out delay-100 hover:-translate-y-1 hover:scale-105 duration-300 hover:shadow-xl-primary">
      <div className="card-body flex flex-col md:flex-row gap-10">
        <div className="avatar">
          <div className="w-16 h-16 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
            <img src={profile?.avatar} alt={profile?.name} />
          </div>
        </div>
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
            <div className="my-3 text-neutral">{parser(thread?.body)}</div>
          </Link>
          <div className="mt-6 flex gap-5 flex-wrap">
            {getAccessToken() === null ? (
              <>
                <UpVote count={summaryVote(thread?.upVotesBy)} />
                <DownVote count={summaryVote(thread?.downVotesBy)} />
              </>
            ) : (
              <>
                <UpVote
                  count={summaryVote(thread?.upVotesBy)}
                  isVoted={isMyIdVote(myProfile?.id, thread.upVotesBy)}
                />
                <DownVote
                  count={summaryVote(thread?.downVotesBy)}
                  isVoted={isMyIdVote(myProfile?.id, thread.downVotesBy)}
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
  thread: PropType.object.isRequired,
};
