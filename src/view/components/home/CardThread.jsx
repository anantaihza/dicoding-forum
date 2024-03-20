import React from 'react';
import { Link } from 'react-router-dom';
import DownVote from './icon/DownVote';
import UpVote from './icon/UpVote';
import Discussion from './icon/Discussion';

export default function CardThread() {
  return (
    <div className="card p-2 w-full bg-white my-8 transition ease-in-out delay-100 hover:-translate-y-1 hover:scale-105 duration-300 hover:shadow-xl-primary">
      <div className="card-body flex flex-row gap-10">
        <div className="avatar">
          <div className="w-16 h-16 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
            <img
              src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
              alt="sd"
            />
          </div>
        </div>
        <div className="grow">
          <Link to="/">
            <div className="flex justify-start gap-3 items-center">
              <h3 className="max-w-96 truncate text-primary text-lg poppins-bold">
                Diskusi Pertama{' '}
              </h3>
              <p className="text-accent">#Redux</p>
              <p className="text-accent justify-self-end text-end">
                10 hari yang lalu
              </p>
            </div>
            <p className="my-3 text-neutral">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea
              voluptatibus corporis nam earum quod illo libero asperiores,
              veniam velit perspiciatis consequatur dolores, atque ipsa! Atque
              dignissimos consectetur a voluptates incidunt.
            </p>
          </Link>
          <div className="mt-6 flex gap-5">
            <UpVote />
            <DownVote />
            <Discussion />
            <p className='justify-self-end text-end text-accent'>Dibuat oleh <b className='text-neutral'>User</b></p>
          </div>
        </div>
      </div>
    </div>
  );
}
