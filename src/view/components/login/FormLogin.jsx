import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function FormLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const onPasswordChange = (event) => {
    setPassword(event.target.value);
  };

  return (
    <>
      <form className="mt-10 px-10 xl:px-20" action="">
        <input
          type="text"
          placeholder="Email"
          className="input input-lg bg-white w-full rounded-full mb-5"
          value={email}
          onChange={onEmailChange}
        />{' '}
        <br />
        <input
          type="text"
          placeholder="Password"
          className="input input-lg bg-white w-full rounded-full mb-5"
          value={password}
          onChange={onPasswordChange}
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
