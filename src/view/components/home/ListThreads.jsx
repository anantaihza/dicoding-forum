import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import filterThreadByCategory from '../../../utils/filterThreads';
import { getThreads } from '../../../redux/features/threads/threadsThunk';
import CardThread from './CardThread';
import SkeletonCard from './skeleton/SkeletonCard';

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
    <div className="list-threads">
      {[...Array(10)].map(() => (
        <SkeletonCard key={Math.random()} />
      ))}
    </div>
  ) : (
    <div className="list-threads">
      {filteredThreads?.map((thread) => (
        <CardThread key={thread.id} thread={thread} />
      ))}
    </div>
  );
}
