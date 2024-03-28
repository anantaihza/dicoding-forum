import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  upVoteThread,
  downVoteThread,
  neutralizeVoteThread,
} from '../../../utils/api/voteThreadAPI';

const upVote = createAsyncThunk('voteThread/upVote', async (id) => {
  const response = await upVoteThread(id);
  return response;
});

const downVote = createAsyncThunk('voteThread/downVote', async (id) => {
  const response = await downVoteThread(id);
  return response;
});

const neutralizeVote = createAsyncThunk('voteThread/neutralize', async (id) => {
  const response = await neutralizeVoteThread(id);
  return response;
});

export { upVote, downVote, neutralizeVote };
