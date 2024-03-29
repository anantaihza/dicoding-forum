import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import filterThreadByCategory from '../../../utils/filterThreads';
import { getThreads } from '../../../redux/features/threads/threadsThunk';
import CardThread from './CardThread';

export default function ListThreads() {
  const dispatch = useDispatch();
  const { datas } = useSelector((state) => state.threads);
  const { activeCategory } = useSelector((state) => state.categories);

  useEffect(() => {
    dispatch(getThreads());
  }, [dispatch]);

  const filteredThreads = activeCategory
    ? filterThreadByCategory(datas, activeCategory)
    : datas;

  return filteredThreads === null ? (
    <div className="flex justify-center items-center w-full h-full">
      <span className="loading loading-spinner loading-lg" />
    </div>
  ) : (
    filteredThreads?.map((thread) => (
      <CardThread key={thread.id} thread={thread} />
    ))
  );
}
