import { createAsyncThunk } from '@reduxjs/toolkit';
import { login, register, getUserProfile } from '../../../utils/api/userAPI';

const registerUser = createAsyncThunk(
  'auth/register',
  async ({ name, email, password }) => {
    const response = await register({ name, email, password });
    return response;
  }
);

const loginUser = createAsyncThunk(
  'auth/login',
  async ({ email, password }) => {
    const response = await login({ email, password });
    return response;
  }
);

const getProfileUser = createAsyncThunk('auth/me', async () => {
  const response = await getUserProfile();
  return response;
});

export { registerUser, loginUser, getProfileUser };
