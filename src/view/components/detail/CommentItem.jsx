import React from 'react';
import UpVote from '../common/icon/UpVote';
import DownVote from '../common/icon/DownVote';

export default function CommentItem() {
  return (
    <>
      <div className="flex gap-6 flex-col md:flex-row">
        <div className="avatar placeholder">
          <div className="bg-neutral text-neutral-content rounded-full w-12 h-12">
            <span>SY</span>
          </div>
        </div>
        <div>
          <div className="flex justify-between flex-col md:flex-row">
            <h4 className="grow poppins-bold text-neutral">Syahroni</h4>
            <p className="text-start md:text-end text-accent">
              10 hari yang lalu
            </p>
          </div>
          <p className="text-neutral mt-2">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident,
            assumenda, nihil numquam tempora saepe dolorem officiis cum quidem
            nulla ipsa aliquam, illum natus. Eos neque quidem qui nisi.
            Incidunt, consectetur.
          </p>
          <div className="flex gap-5 mt-5">
            <UpVote />
            <DownVote />
          </div>
        </div>
      </div>
      <div className="divider" />
    </>
  );
}
