import React from 'react';
import { Link } from 'react-router-dom';

export default function FormRegister() {
  return (
    <>
      <form className="mt-10 px-10 xl:px-20" action="">
        <input
          type="text"
          placeholder="Nama"
          className="input input-lg bg-white w-full rounded-full mb-5"
        />{' '}
        <br />
        <input
          type="text"
          placeholder="Email"
          className="input input-lg bg-white w-full rounded-full mb-5"
        />{' '}
        <br />
        <div className="flex gap-4">
          <input
            type="text"
            placeholder="Password"
            className="input input-lg bg-white w-full rounded-full mb-5"
          />
          <input
            type="text"
            placeholder="Retype password"
            className="input input-lg bg-white w-full rounded-full mb-5"
          />
        </div>
        <br />
        <button
          type="submit"
          className="btn btn-lg btn-block btn-primary text-white rounded-full mt-5"
        >
          Buat
        </button>
      </form>
      <p className="mt-5">
        Kamu sudah punya akun?{' '}
        <Link to="/login" className="text-primary poppins-bold">
          Login
        </Link>
      </p>
    </>
  );
}
