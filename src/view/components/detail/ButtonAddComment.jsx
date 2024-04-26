import React, { useRef, useState } from 'react';
import { toast } from 'react-toastify';
import { Link, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getAccessToken } from '../../../utils/api/userAPI';
import addComment from '../../../redux/features/comment/commentThunk';
import { getThreadDetail } from '../../../redux/features/threads/threadsThunk';
import {
  setIsError,
  setMessage,
} from '../../../redux/features/comment/commentSlice';

export default function ButtonAddComment() {
  const dialogRef = useRef(null);
  const { id } = useParams();
  const dispatch = useDispatch();
  const [content, setContent] = useState('');

  const onContentChange = (event) => {
    setContent(event.target.value);
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      const result = await dispatch(addComment({ threadId: id, content }));
      if (result.payload.status === 'success') {
        setContent('');
        dialogRef.current.close();
        toast.success('Berhasil menambahkan komentar');
        await dispatch(getThreadDetail(id));
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
          className="btn btn-primary text-white rounded-full px-6 poppins-semibold my-5"
          aria-label="add-comment"
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
          Buat Komentar
        </Link>
      ) : (
        <button
          type="button"
          className="btn btn-primary text-white rounded-full px-6 poppins-semibold my-5"
          onClick={() => document.getElementById('add_comment').showModal()}
          aria-label="add-comment"
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
          Buat Komentar
        </button>
      )}

      <dialog
        id="add_comment"
        ref={dialogRef}
        className="modal backdrop-blur-md bg-white/15"
      >
        <div className="modal-box bg-white">
          <form method="dialog">
            <button
              type="submit"
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            >
              ✕
            </button>
          </form>
          <h3 className="font-bold text-lg">Berikan komentar</h3>
          <form onSubmit={onSubmit} className="py-8 px-2">
            <textarea
              className="textarea textarea-primary w-full mb-4"
              placeholder="Ingin berkomentar apa?"
              name="content"
              value={content}
              onChange={onContentChange}
            />
            <button
              type="submit"
              className="btn btn-block btn-primary text-white"
            >
              Kirim
            </button>
          </form>
        </div>
      </dialog>
    </>
  );
}
