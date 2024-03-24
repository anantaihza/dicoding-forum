/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { register, login, putAccessToken } from '../../../utils/api/userAPI';

// TODO: get user profile

export const registerUser = createAsyncThunk(
  'auth/register',
  async ({ name, email, password }) => {
    const response = await register({ name, email, password });
    return response;
  }
);

export const loginUser = createAsyncThunk(
  'auth/login',
  async ({ email, password }) => {
    const response = await login({ email, password });
    return response;
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: null,
    message: null,
    isError: false,
    isLoading: false,
  },
  reducers: {
    setIsError: (state, action) => {
      state.isError = action.payload;
    },
    setMessage: (state, action) => {
      state.message = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isError = false;
        state.isLoading = true;
        state.message = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isError = action.payload.error;
        state.isLoading = false;
        state.message = action.payload.message;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.message = action.error.message;
      });
    builder
      .addCase(loginUser.pending, (state) => {
        state.isError = false;
        state.isLoading = true;
        state.message = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isError = action.payload.error;
        state.isLoading = false;
        state.message = action.payload.message;
        if (action.payload.data) {
          state.token = action.payload.data.token;
          putAccessToken(state.token);
        }
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.message = action.error.message;
      });
  },
});

export const { setIsError, setMessage } = authSlice.actions;
export default authSlice.reducer;
