import { createAsyncThunk } from '@reduxjs/toolkit';
import { getAllThread } from '../../../utils/api/threadAPI';

const getCategories = createAsyncThunk('categories/getCategories', async () => {
  const response = await getAllThread();
  if (response.error) {
    return response.data;
  }

  const allThread = response?.data;
  const uniqueCategories = [
    ...new Set(allThread.map((thread) => thread.category)),
  ];
  return uniqueCategories;
});

export default getCategories;
