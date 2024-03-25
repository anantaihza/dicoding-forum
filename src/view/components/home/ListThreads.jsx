import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CardThread from './CardThread';
import { getThreads } from '../../../redux/features/threads/threadsThunk';

export default function ListThreads() {
  const dispatch = useDispatch();
  const { datas } = useSelector((state) => state.threads);

  useEffect(() => {
    dispatch(getThreads());
  }, [dispatch]);

  return datas === null ? (
    <div className="flex justify-center items-center w-full h-full">
      <span className="loading loading-spinner loading-lg" />
    </div>
  ) : (
    datas.map((thread) => <CardThread key={thread.id} thread={thread} />)
  );
}
