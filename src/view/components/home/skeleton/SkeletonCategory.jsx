import React from 'react';

export default function SkeletonCategory() {
  return (
    <div className="card w-96 bg-white">
      <div className="card-body">
        <div className="skeleton h-6 w-[60%]" />
        <div className="flex flex-wrap gap-3 mt-5">
          <div className="skeleton h-10 w-[20%] rounded-full" />
          <div className="skeleton h-10 w-[40%] rounded-full" />
          <div className="skeleton h-10 w-[20%] rounded-full" />

          <div className="skeleton h-10 w-[50%] rounded-full" />
          <div className="skeleton h-10 w-[40%] rounded-full" />
          <div className="skeleton h-10 w-[40%] rounded-full" />
          <div className="skeleton h-10 w-[30%] rounded-full" />
        </div>
      </div>
    </div>
  );
}
