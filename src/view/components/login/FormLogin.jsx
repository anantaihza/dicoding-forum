import React from 'react';
import { Link } from 'react-router-dom';

export default function FormLogin() {
  return (
    <>
      <form className="mt-10 px-10 xl:px-20" action="">
        <input
          type="text"
          placeholder="Email"
          className="input input-lg bg-white w-full rounded-full mb-5"
        />{' '}
        <br />
        <input
          type="text"
          placeholder="Password"
          className="input input-lg bg-white w-full rounded-full mb-5"
        />
        <br />
        <button
          type="submit"
          className="btn btn-lg btn-block btn-primary text-white rounded-full mt-5"
        >
          Masuk
        </button>
      </form>
      <p className="mt-5">
        Belum memiliki akun?{' '}
        <Link to="/register" className="text-primary poppins-bold">
          Daftar
        </Link>
      </p>
    </>
  );
}
