import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getProfileUser } from '../../../redux/features/auth/authThunk';
import { getAccessToken, removeAccessToken } from '../../../utils/api/userAPI';

export default function Navbar() {
  const dispatch = useDispatch();
  const userProfile = useSelector((state) => state.auth.data);

  useEffect(() => {
    if (getAccessToken() !== null) {
      dispatch(getProfileUser());
    }
  }, [dispatch]);

  const onLogout = () => {
    removeAccessToken();
    window.location.reload();
  };
  return (
    <div className="navbar bg-white px-10 md:px-16 lg:px-28 py-4 fixed top-0 text-neutral z-50 shadow-sm ">
      <div className="container mx-auto">
        <div className="navbar-start">
          <div className="flex items-center">
            <img
              src="/logo.png"
              alt="Logo"
              className="w-14 mr-2"
            />
            <Link
              to="/"
              className="text-base poppins-extrabold text-start leading-4"
            >
              Dicoding <br /> Forum
            </Link>
          </div>
        </div>

        <div className="navbar-end flex">
          <div className="hidden lg:flex mr-5">
            <ul className="menu menu-horizontal px-1">
              <li>
                <Link to="/" className="poppins-medium">
                  Threads
                </Link>
              </li>
              <li>
                <Link to="/leaderboard" className="poppins-medium">
                  Leaderboard
                </Link>
              </li>
            </ul>
          </div>
          <div className="dropdown dropdown-bottom dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost lg:hidden"
              aria-label="Toggle Menu"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-white rounded-box w-52">
              <li>
                <Link to="/">Threads</Link>
              </li>
              <li>
                <Link to="/leaderboard">Leaderboard</Link>
              </li>
            </ul>
          </div>
          {getAccessToken() === null ? (
            <Link
              to="/login"
              className="btn btn-primary text-white rounded-full"
            >
              Login
            </Link>
          ) : (
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar online placeholder"
              >
                <div className="w-10 rounded-full">
                  {userProfile ? (
                    <img src={userProfile.avatar} alt={userProfile.name} />
                  ) : (
                    <div className="bg-neutral text-neutral-content rounded-full w-10 h-10">
                      <span className="loading loading-dots loading-xs" />
                    </div>
                  )}
                </div>
              </div>

              <ul className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-white rounded-box w-52">
                <li>
                  <button type="button" onClick={onLogout}>
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
