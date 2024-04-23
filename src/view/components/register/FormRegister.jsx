import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { setIsError, setMessage } from '../../../redux/features/auth/authSlice';
import { registerUser } from '../../../redux/features/auth/authThunk';

export default function FormRegister() {
  const Navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [retypePassword, setRetypePassword] = useState('');

  const dispatch = useDispatch();
  const { isError, message, isLoading } = useSelector((state) => state.auth);

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

  const onSubmitRegister = async (event) => {
    event.preventDefault();
    try {
      if (isPasswordMatch()) {
        const result = await dispatch(registerUser({ name, email, password }));
        if (result.payload.status === 'success') {
          setName('');
          setEmail('');
          setPassword('');
          setRetypePassword('');
          Navigate('/login');
          toast.success('Register Berhasil');
        }
      }
    } catch (error) {
      dispatch(setIsError(true));
      dispatch(setMessage(error.message));
      toast.error(error.message);
    }
  };

  return (
    <>
      <div className="px-20 mt-8">
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
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
            <span>{message}</span>
          </div>
        )}
      </div>

      <form className="mt-10 px-10 xl:px-20" onSubmit={onSubmitRegister}>
        <input
          type="text"
          placeholder="Nama"
          name="nama"
          autoComplete="name"
          className="input input-lg bg-white w-full rounded-full mb-5"
          value={name}
          onChange={onNameChange}
        />{' '}
        <br />
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
        {!isPasswordMatch() && (
          <div className="px-1 mb-2">
            <div role="alert" className="alert alert-warning">
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
              <span>Password harus sama.</span>
            </div>
          </div>
        )}
        <div className="flex gap-4">
          <input
            type="password"
            placeholder="Password"
            name="password"
            className="input input-lg bg-white w-full rounded-full mb-5"
            value={password}
            onChange={onPasswordChange}
          />
          <input
            type="password"
            placeholder="Retype password"
            name="retypePassword"
            className="input input-lg bg-white w-full rounded-full mb-5"
            value={retypePassword}
            onChange={onRetypePasswordChange}
          />
        </div>
        <br />
        <button
          type="submit"
          className="btn btn-lg btn-block btn-primary text-white rounded-full mt-5"
        >
          {isLoading ? (
            <span className="loading loading-dots loading-lg" />
          ) : (
            'Register'
          )}
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
