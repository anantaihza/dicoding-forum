import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { setIsError, setMessage } from '../../../redux/features/auth/authSlice';
import { loginUser } from '../../../redux/features/auth/authThunk';

export default function FormLogin() {
  const Navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const { isError, message, isLoading } = useSelector((state) => state.auth);

  const onEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const onPasswordChange = (event) => {
    setPassword(event.target.value);
  };
  const onSubmitLogin = async (event) => {
    event.preventDefault();
    try {
      const result = await dispatch(loginUser({ email, password }));
      if (result.payload.status === 'success') {
        setEmail('');
        setPassword('');
        Navigate('/');
        toast.success('Login Berhasil');
      }
    } catch (error) {
      dispatch(setIsError(true));
      dispatch(setMessage(error.message));
      toast.error(error.message);
    }
  };

  return (
    <>
      <div className="px-20 mt-10">
        {!isError && message && (
          <div role="alert" className="alert alert-success">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="stroke-current shrink-0 h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>{message}. Silakan melakukan login</span>
          </div>
        )}
        {isError && (
          <div role="alert" className="alert alert-error">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="stroke-current shrink-0 h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>{message}</span>
          </div>
        )}
      </div>
      <form className="mt-10 px-10 xl:px-20" onSubmit={onSubmitLogin}>
        <input
          type="email"
          placeholder="Email"
          name="email"
          autoComplete="email"
          className="input input-lg bg-white w-full rounded-full mb-5"
          value={email}
          onChange={onEmailChange}
        />{' '}
        <br />
        <input
          type="password"
          placeholder="Password"
          name="password"
          className="input input-lg bg-white w-full rounded-full mb-5"
          value={password}
          onChange={onPasswordChange}
        />
        <br />
        <button
          type="submit"
          className="btn btn-lg btn-block btn-primary text-white rounded-full mt-5"
        >
          {isLoading ? (
            <span className="loading loading-dots loading-lg" />
          ) : (
            'Masuk'
          )}
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
