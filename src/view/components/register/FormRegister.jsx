import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function FormRegister() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [retypePassword, setRetypePassword] = useState('');

  const onNameChange = (event) => {
    setName(event.target.value);
  };

  const onEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const onPasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const onRetypePasswordChange = (event) => {
    setRetypePassword(event.target.value);
  };

  const isPasswordMatch = () => password === retypePassword;

  return (
    <>
      <form className="mt-10 px-10 xl:px-20" action="">
        <input
          type="text"
          placeholder="Nama"
          className="input input-lg bg-white w-full rounded-full mb-5"
          value={name}
          onChange={onNameChange}
        />{' '}
        <br />
        <input
          type="text"
          placeholder="Email"
          className="input input-lg bg-white w-full rounded-full mb-5"
          value={email}
          onChange={onEmailChange}
        />{' '}
        <br />
        <div className="flex gap-4">
          <input
            type="text"
            placeholder="Password"
            className="input input-lg bg-white w-full rounded-full mb-5"
            value={password}
            onChange={onPasswordChange}
          />
          <input
            type="text"
            placeholder="Retype password"
            className="input input-lg bg-white w-full rounded-full mb-5"
            value={retypePassword}
            onChange={onRetypePasswordChange}
          />
        </div>
        {!isPasswordMatch() && (
          <p className="text-red-600">Password harus sama</p>
        )}
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
