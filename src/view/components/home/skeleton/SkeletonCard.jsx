import React from 'react';

export default function SkeletonCard() {
  return (
    <div className="card p-2 w-full grow bg-white my-8 transition ease-in-out delay-100 hover:-translate-y-1 hover:scale-105 duration-300 hover:shadow-xl-primary">
      <div className="card-body flex flex-col md:flex-row gap-10">
        <div className="avatar">
          <div className="skeleton w-16 h-16 rounded-full shrink-0" />
        </div>
        <div className="grow">
          <div className="flex justify-start gap-x-3 gap-y-0 items-start md:item-center flex-wrap flex-col lg:flex-row">
            <div className="skeleton w-[40%] h-5" />
            <div className="skeleton w-[70%] h-5 mt-6" />
          </div>
          <div className="mt-6 flex gap-5 flex-wrap justify-between">
            <div className="skeleton w-[30%] h-5" />
            <div className="skeleton w-[30%] h-5" />
          </div>
        </div>
      </div>
    </div>
  );
}
