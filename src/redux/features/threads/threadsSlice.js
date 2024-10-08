import { createSlice } from '@reduxjs/toolkit';
import { getThreads, getThreadDetail, addThread } from './threadsThunk';

const threadsSlice = createSlice({
  name: 'threads',
  initialState: {
    datas: null,
    dataDetail: null,
    dataCreate: null,
    message: null,
    isError: false,
    isLoading: true,
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
      .addCase(getThreads.pending, (state) => {
        state.isError = false;
        state.isLoading = true;
        state.message = null;
      })
      .addCase(getThreads.fulfilled, (state, action) => {
        state.isError = action.payload.error;
        state.isLoading = false;
        state.message = action.payload.message;
        if (action.payload.data) {
          state.datas = action.payload.data;
        }
      })
      .addCase(getThreads.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.message = action.error.message;
      });

    builder
      .addCase(getThreadDetail.pending, (state) => {
        state.isError = false;
        state.isLoading = true;
        state.message = null;
        state.dataDetail = null;
      })
      .addCase(getThreadDetail.fulfilled, (state, action) => {
        state.isError = action.payload.error;
        state.isLoading = false;
        state.message = action.payload.message;
        if (action.payload.data) {
          state.dataDetail = action.payload.data;
        }
      })
      .addCase(getThreadDetail.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.message = action.error.message;
      });

    builder
      .addCase(addThread.pending, (state) => {
        state.isError = false;
        state.isLoading = true;
        state.message = null;
      })
      .addCase(addThread.fulfilled, (state, action) => {
        state.isError = action.payload.error;
        state.isLoading = false;
        state.message = action.payload.message;
        if (action.payload.data) {
          state.dataCreate = action.payload.data;
        }
      })
      .addCase(addThread.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.message = action.error.message;
      });
  },
});

export const { setIsError, setMessage } = threadsSlice.actions;

export default threadsSlice.reducer;
