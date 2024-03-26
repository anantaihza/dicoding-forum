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
      <div className="pt-32 container px-10 md:px-16 lg:px-28 mx-auto flex gap-12">
        <div>
          <div className="flex justify-between flex-col md:flex-row gap-y-3 mb-4">
            <TitleHome />
            <ButtonCreate />
          </div>
          <label
            className="form-control w-full max-w-xs block xl:hidden"
            htmlFor="category"
          >
            <div className="label">
              <span className="label-text">Filter Kategori</span>
            </div>
            <select
              id="category"
              className="select select-sm w-full max-w-xs bg-white"
              defaultValue="All"
            >
              <option value="All">All</option>
              <option value="Redux">Redux</option>
              <option value="Apa">Small Orange</option>
              <option value="Gatau">Small Tomato</option>
            </select>
          </label>

          <ListThreads />
        </div>
        <div className="flex-col xl:gap-8 mt-20 hidden xl:flex">
          <CategoryPopular />
          <FlashLeaderboard />
        </div>
      </div>
    </div>
  );
}
