import { createAsyncThunk } from '@reduxjs/toolkit';
import { createComment } from '../../../utils/api/commentAPI';

const addComment = createAsyncThunk(
  'comment/addComment',
  async ({ threadId, content }) => {
    const response = await createComment({ threadId, content });
    return response;
  }
);

export default addComment;
