import React from 'react';
import { useSelector } from 'react-redux';
import getTimeAgo from '../../../utils/timeAgo';

export default function TitleDetail() {
  const { dataDetail } = useSelector((state) => state.threads);
  return (
    <>
      <div className="badge badge-accent badge-outline badge-lg">
        #{dataDetail?.category}
      </div>
      <div className="flex items-start mt-3 flex-col-reverse lg:flex-row">
        <h2 className="text-primary text-3xl poppins-bold grow w-64 md:w-80">
          {dataDetail?.title}
        </h2>
        <p className="text-accent text-end">
          {getTimeAgo(dataDetail?.createdAt)}
        </p>
      </div>
      <p className="text-accent">
        Dibuat oleh <b className="text-neutral">{dataDetail?.owner?.name}</b>
      </p>
    </>
  );
}
