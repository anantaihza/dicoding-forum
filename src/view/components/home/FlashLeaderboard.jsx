import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { countTotalUsers } from '../../../redux/features/leaderboard/leaderboardSlice';
import getAllLeaderboard from '../../../redux/features/leaderboard/leaderboardThunk';
import GroupAvatar from './GroupAvatar';

export default function FlashLeaderboard() {
  const dispatch = useDispatch();
  const { listBoard, totalUsers } = useSelector((state) => state.leaderboard);

  useEffect(() => {
    dispatch(getAllLeaderboard());
  }, [dispatch]);

  useEffect(() => {
    if (listBoard) {
      dispatch(countTotalUsers());
    }
  }, [listBoard, dispatch]);

  const topThree = listBoard?.slice(0, 3);

  return (
    <div className="card w-96 bg-white">
      <div className="card-body">
        <h2 className="card-title">Leaderboard</h2>

        {topThree ? (
          <GroupAvatar listBoard={topThree} totalUser={totalUsers} />
        ) : (
          <div className="flex justify-center">
            <span className="loading loading-dots loading-lg bg-neutral" />
          </div>
        )}

        <div className="text-center">
          <Link
            to="/leaderboard"
            className="btn btn-block btn-primary text-white"
          >
            See More
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3"
              />
            </svg>
          </Link>
        </div>

        <div className="overflow-x-auto mt-2">
          <table className="table">
            <thead>
              <tr>
                <th>No</th>
                <th>Nama</th>
                <th>Score</th>
              </tr>
            </thead>
            <tbody>
              {topThree?.map((board, index) => (
                <tr key={board?.user?.id}>
                  <th>{index + 1}</th>
                  <td>{board?.user?.name}</td>
                  <td>{board?.score}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
