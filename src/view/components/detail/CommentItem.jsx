import React from 'react';
import PropType from 'prop-types';
import parser from 'html-react-parser';
import { useSelector } from 'react-redux';
import UpVoteComment from '../common/icon/UpVoteComment';
import DownVoteComment from '../common/icon/DownVoteComment';
import getTimeAgo from '../../../utils/timeAgo';
import { summaryVote, isMyIdVote } from '../../../utils/countVote';
import { getAccessToken } from '../../../utils/api/userAPI';

export default function CommentItem({ comment }) {
  const myProfile = useSelector((state) => state.auth.data);
  return (
    <>
      <div className="flex gap-6 flex-col md:flex-row">
        <div className="avatar placeholder">
          <div className="w-12 h-12 rounded-full">
            <img src={comment?.owner?.avatar} alt={comment?.owner?.name} />
          </div>
        </div>
        <div className="w-full">
          <div className="flex justify-between flex-col md:flex-row">
            <h4 className="grow poppins-bold text-neutral">
              {comment?.owner?.name}
            </h4>
            <p className="text-start md:text-end text-accent">
              {getTimeAgo(comment?.createdAt)}
            </p>
          </div>
          <p className="text-neutral mt-2">{parser(comment?.content)}</p>
          <div className="flex gap-5 mt-5">
            {getAccessToken() === null ? (
              <>
                <UpVoteComment count={summaryVote(comment?.upVotesBy)} />
                <DownVoteComment count={summaryVote(comment?.downVotesBy)} />
              </>
            ) : (
              <>
                <UpVoteComment
                  count={summaryVote(comment?.upVotesBy)}
                  isVoted={isMyIdVote(myProfile?.id, comment?.upVotesBy)}
                />
                <DownVoteComment
                  count={summaryVote(comment?.downVotesBy)}
                  isVoted={isMyIdVote(myProfile?.id, comment?.downVotesBy)}
                />
              </>
            )}
          </div>
        </div>
      </div>
      <div className="divider" />
    </>
  );
}

CommentItem.propTypes = {
  comment: PropType.object.isRequired,
};
