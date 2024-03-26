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

export default function Leaderboard() {
  const dispatch = useDispatch();
  const {
    highScore,
    totalScore,
    totalUsers,
    isHighScoreLoading,
    isTotalScoreLoading,
    isTotalUsersLoading,
  } = useSelector((state) => state.leaderboard);

  useEffect(() => {
    dispatch(getAllLeaderboard());
    dispatch(countHighScore());
    dispatch(countTotalScore());
    dispatch(countTotalUsers());
  }, [dispatch]);


  return (
    <div className="bg-base-100">
      <Navbar />
      <div className="pt-32 pb-20 container mx-auto px-10 md:px-16 lg:px-28">
        <div className="card bg-white shadow-xl px-10 py-6">
          <div className="card-body">
            <div className="flex gap-10 flex-col md:flex-row">
              <Stats
                title="Total Score"
                value={totalScore}
                isLoading={isTotalScoreLoading}
              />
              <Stats
                title="Score Tertinggi"
                value={highScore}
                isLoading={isHighScoreLoading}
              />
              <Stats
                title="Total User"
                value={totalUsers}
                isLoading={isTotalUsersLoading}
              />
            </div>
            <ScoreBoard />
          </div>
        </div>
      </div>
    </div>
  );
}
