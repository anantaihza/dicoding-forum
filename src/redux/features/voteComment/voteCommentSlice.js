import { createSlice } from '@reduxjs/toolkit';
import { upVote, downVote, neutralizeVote } from './voteCommentThunk';

const voteCommentSlice = createSlice({
  name: 'voteComment',
  initialState: {
    vote: null,
    message: null,
    isError: false,
    isLoading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(upVote.pending, (state) => {
        state.isError = false;
        state.isLoading = true;
      })
      .addCase(upVote.fulfilled, (state, action) => {
        state.isError = action.payload.error;
        state.isLoading = false;
        state.message = action.payload.message;
        if (action.payload.data) {
          state.vote = action.payload.data;
        }
      })
      .addCase(upVote.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.message = action.error.message;
      });

    builder
      .addCase(downVote.pending, (state) => {
        state.isError = false;
        state.isLoading = true;
      })
      .addCase(downVote.fulfilled, (state, action) => {
        state.isError = action.payload.error;
        state.isLoading = false;
        state.message = action.payload.message;
        if (action.payload.data) {
          state.vote = action.payload.data;
        }
      })
      .addCase(downVote.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.message = action.error.message;
      });

    builder
      .addCase(neutralizeVote.pending, (state) => {
        state.isError = false;
        state.isLoading = true;
      })
      .addCase(neutralizeVote.fulfilled, (state, action) => {
        state.isError = action.payload.error;
        state.isLoading = false;
        state.message = action.payload.message;
        if (action.payload.data) {
          state.vote = action.payload.data;
        }
      })
      .addCase(neutralizeVote.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.message = action.error.message;
      });
  },
});

export default voteCommentSlice.reducer;
