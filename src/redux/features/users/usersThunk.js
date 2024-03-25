import { createAsyncThunk } from '@reduxjs/toolkit';
import { getAllUser } from '../../../utils/api/userAPI';

const getUsers = createAsyncThunk('users/getUsers', async () => {
  const response = await getAllUser();
  return response;
});

export default getUsers;
