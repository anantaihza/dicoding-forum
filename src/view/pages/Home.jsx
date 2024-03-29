import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import getCategories from '../../redux/features/categories/categoriesThunk';
import getAllLeaderboard from '../../redux/features/leaderboard/leaderboardThunk';
import Navbar from '../components/common/Navbar';
import TitleHome from '../components/home/TitleHome';
import ButtonCreate from '../components/home/ButtonCreate';
import ListThreads from '../components/home/ListThreads';
import CategoryPopular from '../components/home/CategoryPopular';
import FlashLeaderboard from '../components/home/FlashLeaderboard';
import FilterCategory from '../components/home/FilterCategory';
import SkeletonCategory from '../components/home/skeleton/SkeletonCategory';
import SkeletonLeaderboard from '../components/home/skeleton/SkeletonLeaderboard';

export default function Home() {
  const dispatch = useDispatch();
  const loadingCategory = useSelector((state) => state.categories.isLoading);
  const loadingLeaderboard = useSelector(
    (state) => state.leaderboard.isLoading
  );

  useEffect(() => {
    dispatch(getCategories());
    dispatch(getAllLeaderboard());
  }, [dispatch]);

  return (
    <div className="bg-base-100">
      <Navbar />
      <div className="pt-32 container px-10 md:px-16 lg:px-28 mx-auto flex justify-between gap-12">
        <div className="w-full">
          <div className="flex justify-between flex-col md:flex-row gap-y-3 mb-4">
            <TitleHome />
            <ButtonCreate />
          </div>

          <FilterCategory />

          <ListThreads />
        </div>
        <div className="flex-col xl:gap-8 mt-20 hidden xl:flex">
          {loadingCategory ? <SkeletonCategory /> : <CategoryPopular />}
          {loadingLeaderboard ? <SkeletonLeaderboard /> : <FlashLeaderboard />}
          {/* <FlashLeaderboard /> */}
        </div>
      </div>
    </div>
  );
}
