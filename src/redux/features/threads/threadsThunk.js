import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  getAllThread,
  getDetailThread,
  createThread,
} from '../../../utils/api/threadAPI';

const getThreads = createAsyncThunk('threads/getThread', async () => {
  const response = await getAllThread();
  return response;
});

const getThreadDetail = createAsyncThunk(
  'threads/getThreadDetail',
  async (id) => {
    const response = await getDetailThread(id);
    return response;
  }
);

const addThread = createAsyncThunk(
  'threads/addThread',
  async ({ title, body, category }) => {
    const response = await createThread({ title, body, category });
    return response;
  }
);

export { getThreads, getThreadDetail, addThread };
