import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import getCategories from '../../redux/features/categories/categoriesThunk';
import Navbar from '../components/common/Navbar';
import TitleHome from '../components/home/TitleHome';
import ButtonCreate from '../components/home/ButtonCreate';
import ListThreads from '../components/home/ListThreads';
import CategoryPopular from '../components/home/CategoryPopular';
import FlashLeaderboard from '../components/home/FlashLeaderboard';
import FilterCategory from '../components/home/FilterCategory';

export default function Home() {
  const dispatch = useDispatch();
  // const { listCategory } = useSelector((state) => state.categories);

  useEffect(() => {
    dispatch(getCategories());
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
          <CategoryPopular />
          <FlashLeaderboard />
        </div>
      </div>
    </div>
  );
}
