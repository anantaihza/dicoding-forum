import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getProfileUser } from '../../redux/features/auth/authThunk';
import { getThreadDetail } from '../../redux/features/threads/threadsThunk';
import Navbar from '../components/common/Navbar';
import UpVote from '../components/common/icon/UpVote';
import DownVote from '../components/common/icon/DownVote';
import TitleDetail from '../components/detail/TitleDetail';
import CommentList from '../components/detail/CommentList';
import ContentDetail from '../components/detail/ContentDetail';
import ButtonAddComment from '../components/detail/ButtonAddComment';
import { getAccessToken } from '../../utils/api/userAPI';
import { summaryVote, isMyIdVote } from '../../utils/countVote';

export default function Detail() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const myProfile = useSelector((state) => state.auth.data);
  const { dataDetail } = useSelector((state) => state.threads);

  useEffect(() => {
    if (getAccessToken() !== null) {
      dispatch(getProfileUser());
    }
    dispatch(getThreadDetail(id));
  }, [id, dispatch]);

  return (
    <div className="bg-base-100">
      <Navbar />
      <div className="pt-32 pb-20 container mx-auto px-10 md:px-16 lg:px-28">
        <div className="card bg-white shadow-xl px-10 py-6">
          <div className="card-body">
            <TitleDetail />
            <ContentDetail body={dataDetail?.body} />
            <div className="flex gap-5 mt-5">
              {getAccessToken() === null ? (
                <>
                  <UpVote count={summaryVote(dataDetail?.upVotesBy)} />
                  <DownVote count={summaryVote(dataDetail?.downVotesBy)} />
                </>
              ) : (
                <>
                  <UpVote
                    count={summaryVote(dataDetail?.upVotesBy)}
                    isVoted={isMyIdVote(myProfile?.id, dataDetail?.upVotesBy)}
                  />
                  <DownVote
                    count={summaryVote(dataDetail?.downVotesBy)}
                    isVoted={isMyIdVote(myProfile?.id, dataDetail?.downVotesBy)}
                  />
                </>
              )}
            </div>
            <ButtonAddComment />
            <CommentList />
          </div>
        </div>
      </div>
    </div>
  );
}
