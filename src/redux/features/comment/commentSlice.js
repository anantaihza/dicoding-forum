import { createSlice } from '@reduxjs/toolkit';
import addComment from './commentThunk';

const commentSlice = createSlice({
  name: 'comment',
  initialState: {
    comments: null,
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
      .addCase(addComment.pending, (state) => {
        state.isError = false;
        state.isLoading = true;
        state.message = null;
      })
      .addCase(addComment.fulfilled, (state, action) => {
        state.isError = action.payload.error;
        state.isLoading = false;
        state.message = action.payload.message;
        if (action.payload.data) {
          state.comments = action.payload.data;
        }
      })
      .addCase(addComment.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.message = action.error.message;
      });
  },
});

export const { setIsError, setMessage } = commentSlice.actions;

export default commentSlice.reducer;
