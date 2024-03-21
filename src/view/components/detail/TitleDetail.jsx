import React from 'react';

export default function TitleDetail() {
  return (
    <>
      <div className="badge badge-accent badge-outline badge-lg">#Redux</div>
      <div className="flex items-start mt-3 flex-col-reverse lg:flex-row">
        <h2 className="text-primary text-3xl poppins-bold grow w-64 md:w-80">
          Thread Pertama slkdjf sdf sldkfj sdflkj lfdgjl dfgldkfj gdlfkgjldkfg
          ldkgj dflgfl k
        </h2>
        <p className="text-accent text-end">10 hari yang lalu</p>
      </div>
      <p className="text-accent">
        Dibuat oleh <b className="text-neutral">User</b>
      </p>
    </>
  );
}
