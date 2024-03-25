import { createSlice } from '@reduxjs/toolkit';
import getUsers from './usersThunk';

const usersSlice = createSlice({
  name: 'users',
  initialState: {
    users: null,
    profileUser: null,
    message: null,
    isError: false,
    isLoading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUsers.pending, (state) => {
        state.isError = false;
        state.isLoading = true;
        state.message = null;
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        state.isError = action.payload.error;
        state.isLoading = false;
        state.message = action.payload.message;
        if (action.payload.data) {
          state.users = action.payload.data;
        }
      })
      .addCase(getUsers.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.message = action.error.message;
      });
  },
});

export const { setOwnerId } = usersSlice.actions;
export default usersSlice.reducer;
