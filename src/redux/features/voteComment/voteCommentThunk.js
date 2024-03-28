import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  upVoteComment,
  downVoteComment,
  neutralizeVoteComment,
} from '../../../utils/api/voteCommentAPI';

const upVote = createAsyncThunk(
  'voteComment/upVote',
  async ({ threadId, commentId }) => {
    const response = await upVoteComment({ threadId, commentId });
    return response;
  }
);

const downVote = createAsyncThunk(
  'voteComment/downVote',
  async ({ threadId, commentId }) => {
    const response = await downVoteComment({ threadId, commentId });
    return response;
  }
);

const neutralizeVote = createAsyncThunk(
  'voteComment/neutralize',
  async ({ threadId, commentId }) => {
    const response = await neutralizeVoteComment({ threadId, commentId });
    return response;
  }
);

export { upVote, downVote, neutralizeVote };
