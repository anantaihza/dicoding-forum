import { createSlice } from '@reduxjs/toolkit';
import { putAccessToken } from '../../../utils/api/userAPI';
import { registerUser, loginUser, getProfileUser } from './authThunk';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    data: null,
    token: null,
    message: null,
    isError: false,
    isLoading: false,
  },
  reducers: {
    setMessage: (state, action) => {
      state.message = action.payload;
    },
    setIsError: (state, action) => {
      state.isError = action.payload;
    },
    setData: (state, action) => {
      state.data = action.payload;
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

    builder
      .addCase(getProfileUser.pending, (state) => {
        state.isError = false;
        state.isLoading = true;
        state.message = null;
      })
      .addCase(getProfileUser.fulfilled, (state, action) => {
        state.isError = action.payload.error;
        state.isLoading = false;
        state.message = action.payload.message;
        if (action.payload.data) {
          state.data = action.payload.data;
        }
      })
      .addCase(getProfileUser.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.message = action.error.message;
        state.data = null;
      });
  },
});

export const { setIsError, setMessage, setData } = authSlice.actions;
export default authSlice.reducer;
