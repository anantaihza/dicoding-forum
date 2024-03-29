import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {
  setIsError,
  setMessage,
} from '../../../redux/features/threads/threadsSlice';
import { addThread } from '../../../redux/features/threads/threadsThunk';
import { getAccessToken } from '../../../utils/api/userAPI';

export default function ButtonCreate() {
  const dispatch = useDispatch();
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [body, setBody] = useState('');

  const onTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const onCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  const onBodyChange = (event) => {
    setBody(event.target.value);
  };

  const onSubmit = async (event) => {
    event.preventDefault();

    try {
      const result = await dispatch(addThread({ title, body, category }));
      if (result.payload.status === 'success') {
        setTitle('');
        setCategory('');
        setBody('');
        window.location.reload();
      }
    } catch (error) {
      dispatch(setIsError(true));
      dispatch(setMessage(error.message));
    }
  };

  return (
    <>
      {getAccessToken() === null ? (
        <Link
          to="/login"
          className="btn btn-primary text-white rounded-full px-6 poppins-semibold"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 0 1 .865-.501 48.172 48.172 0 0 0 3.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z"
            />
          </svg>
          Buat Diskusi
        </Link>
      ) : (
        <button
          type="button"
          className="btn btn-primary text-white rounded-full px-6 poppins-semibold"
          onClick={() => document.getElementById('my_modal_3').showModal()}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 0 1 .865-.501 48.172 48.172 0 0 0 3.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z"
            />
          </svg>
          Buat Diskusi
        </button>
      )}

      <dialog id="my_modal_3" className="modal backdrop-blur-md bg-white/15">
        <div className="modal-box bg-white">
          <form method="dialog">
            <button
              type="submit"
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            >
              ✕
            </button>
          </form>
          <h3 className="font-bold text-lg">Buat Diskusi Baru</h3>
          <form onSubmit={onSubmit} className="py-8 px-2">
            <input
              type="text"
              placeholder="Judul Diskusi"
              name="title"
              className="input input-bordered input-primary w-full mb-4"
              value={title}
              onChange={onTitleChange}
              required
            />
            <input
              type="text"
              placeholder="Kategori"
              name="category"
              className="input input-bordered input-primary w-full mb-4"
              value={category}
              onChange={onCategoryChange}
              required
            />

            <textarea
              className="textarea textarea-primary w-full mb-4"
              placeholder="Ingin diskusi apa?"
              name="body"
              value={body}
              onChange={onBodyChange}
              required
            />

            <br />
            <button
              type="submit"
              className="btn btn-block btn-primary text-white"
            >
              Buat
            </button>
          </form>
        </div>
      </dialog>
    </>
  );
}
