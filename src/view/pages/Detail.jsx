import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getProfileUser } from '../../redux/features/auth/authThunk';
import { getThreadDetail } from '../../redux/features/threads/threadsThunk';
import Navbar from '../components/common/Navbar';
import UpVoteThread from '../components/common/icon/UpVoteThread';
import DownVoteThread from '../components/common/icon/DownVoteThread';
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

  const [isUpVoteActive, setIsUpVoteActive] = useState(false);
  const [isDownVoteActive, setIsDownVoteActive] = useState(false);
  const [countUp, setCountUp] = useState(0);
  const [countDown, setCountDown] = useState(0);

  useEffect(() => {
    if (getAccessToken() !== null) {
      dispatch(getProfileUser());
    }
    dispatch(getThreadDetail(id));
  }, [id, dispatch]);

  useEffect(() => {
    setIsUpVoteActive(isMyIdVote(myProfile?.id, dataDetail?.upVotesBy));
    setIsDownVoteActive(isMyIdVote(myProfile?.id, dataDetail?.downVotesBy));
    setCountUp(summaryVote(dataDetail?.upVotesBy));
    setCountDown(summaryVote(dataDetail?.downVotesBy));
  }, [dataDetail, myProfile]);

  return (
    dataDetail && (
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
                    <UpVoteThread idThread={id} countUp={countUp} />
                    <DownVoteThread idThread={id} count={countDown} />
                  </>
                ) : (
                  <>
                    <UpVoteThread
                      idThread={id}
                      countUp={countUp}
                      setCountUp={setCountUp}
                      setCountDown={setCountDown}
                      isUpActive={isUpVoteActive}
                      setUp={setIsUpVoteActive}
                      isDownActive={isDownVoteActive}
                      setDown={setIsDownVoteActive}
                    />
                    <DownVoteThread
                      idThread={id}
                      countDown={countDown}
                      setCountDown={setCountDown}
                      setCountUp={setCountUp}
                      isUpActive={isUpVoteActive}
                      setUp={setIsUpVoteActive}
                      isDownActive={isDownVoteActive}
                      setDown={setIsDownVoteActive}
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
    )
  );
}
