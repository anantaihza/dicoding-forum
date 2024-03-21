import React from 'react';
import Navbar from '../components/common/Navbar';
import Stats from '../components/leaderboard/Stats';
import ScoreBoard from '../components/leaderboard/ScoreBoard';

export default function Leaderboard() {
  return (
    <div className="bg-base-100">
      <Navbar />
      <div className="pt-32 pb-20 container mx-auto px-10 md:px-16 lg:px-28">
        <div className="card bg-white shadow-xl px-10 py-6">
          <div className="card-body">
            <div className='flex gap-10 flex-col md:flex-row'>
              <Stats />
              <Stats />
            </div>
            <ScoreBoard />
          </div>
        </div>
      </div>
    </div>
  );
}
