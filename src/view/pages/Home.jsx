import React from 'react';
import Navbar from '../components/common/Navbar';
import TitleHome from '../components/home/TitleHome';
import ButtonCreate from '../components/home/ButtonCreate';
import ListThreads from '../components/home/ListThreads';
import CategoryPopular from '../components/home/CategoryPopular';
import FlashLeaderboard from '../components/home/FlashLeaderboard';

export default function Home() {
  return (
    <div className="bg-base-100">
      <Navbar />
      <div className="pt-32 container px-28 mx-auto flex gap-12">
        <div>
          <div className="flex justify-between">
            <TitleHome />
            <ButtonCreate />
          </div>
          <ListThreads />
        </div>
        <div className="flex flex-col gap-8 mt-20">
          <CategoryPopular />
          <FlashLeaderboard />
        </div>
      </div>
    </div>
  );
}
