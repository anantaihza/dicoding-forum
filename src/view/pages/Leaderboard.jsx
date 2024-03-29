import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import getAllLeaderboard from '../../redux/features/leaderboard/leaderboardThunk';
import {
  countHighScore,
  countTotalScore,
  countTotalUsers,
} from '../../redux/features/leaderboard/leaderboardSlice';
import Navbar from '../components/common/Navbar';
import Stats from '../components/leaderboard/Stats';
import ScoreBoard from '../components/leaderboard/ScoreBoard';
import SkeletonScoreBoard from '../components/leaderboard/skeleton/SkeletonScoreBoard';

export default function Leaderboard() {
  const dispatch = useDispatch();
  const { listBoard, highScore, totalScore, totalUsers, isLoading } =
    useSelector((state) => state.leaderboard);

  useEffect(() => {
    dispatch(getAllLeaderboard());
  }, [dispatch]);

  useEffect(() => {
    if (listBoard) {
      dispatch(countHighScore());
      dispatch(countTotalScore());
      dispatch(countTotalUsers());
    }
  }, [listBoard, dispatch]);

  return (
    <div className="bg-base-100">
      <Navbar />
      <div className="pt-32 pb-20 container mx-auto px-10 md:px-16 lg:px-28">
        <div className="card bg-white shadow-xl px-10 py-6">
          <div className="card-body">
            <div className="flex gap-10 flex-col md:flex-row">
              <Stats
                title="Total Score"
                value={totalScore.value}
                isLoading={totalScore.isTotalScoreLoading}
              />
              <Stats
                title="Score Tertinggi"
                value={highScore.value}
                isLoading={highScore.isHighScoreLoading}
              />
              <Stats
                title="Total User"
                value={totalUsers.value}
                isLoading={totalUsers.isTotalUsersLoading}
              />
            </div>
            {isLoading ? <SkeletonScoreBoard /> : <ScoreBoard />}
          </div>
        </div>
      </div>
    </div>
  );
}
