import React from 'react';
import { Link } from 'react-router-dom';
import UpVote from '../common/icon/UpVote';
import DownVote from '../common/icon/DownVote';
import Discussion from '../common/icon/Discussion';
import getInitials from '../../../utils/InitialName';
import getTimeAgo from '../../../utils/TimeAgo';

export default function CardThread() {
  return (
    <div className="card p-2 w-full bg-white my-8 transition ease-in-out delay-100 hover:-translate-y-1 hover:scale-105 duration-300 hover:shadow-xl-primary">
      <div className="card-body flex flex-col md:flex-row gap-10">
        <div className="avatar placeholder">
          <div className="bg-neutral text-neutral-content rounded-full w-16 h-16 ring ring-primary ring-offset-base-100 ring-offset-2">
            <span>{getInitials('Doe Hoan')}</span>
          </div>
        </div>
        <div className="grow">
          <Link to="/detail">
            <div className="flex justify-start gap-x-3 gap-y-0 items-start md:item-center flex-wrap flex-col lg:flex-row">
              <h3 className="md:max-w-80 lg:max-w-96 md:truncate text-primary text-lg poppins-bold">
                Diskusi Pertama slslp dfkgdf lgjdlfkgjdf ldkfgj sdfjh sjdhf{' '}
              </h3>
              <p className="text-accent">#Redux</p>
              <p className="text-accent justify-self-end text-start md:text-end">
                {getTimeAgo('2021-06-21T07:00:00.000Z')}
              </p>
            </div>
            <p className="my-3 text-neutral">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea
              voluptatibus corporis nam earum quod illo libero asperiores,
              veniam velit perspiciatis consequatur dolores, atque ipsa! Atque
              dignissimos consectetur a voluptates incidunt.
            </p>
          </Link>
          <div className="mt-6 flex gap-5 flex-wrap">
            <UpVote />
            <DownVote />
            <Discussion />
            <p className="justify-self-end text-start md:text-end text-accent">
              Dibuat oleh <b className="text-neutral">User</b>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
