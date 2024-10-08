import { configureStore } from '@reduxjs/toolkit';

import authReducer from '../features/auth/authSlice';
import usersReducer from '../features/users/usersSlice';
import threadReducer from '../features/threads/threadsSlice';
import commentReducer from '../features/comment/commentSlice';
import categoriesReducer from '../features/categories/categoriesSlice';
import voteThreadReducer from '../features/voteThread/voteThreadSlice';
import voteCommentReducer from '../features/voteComment/voteCommentSlice';
import leaderboardReducer from '../features/leaderboard/leaderboardSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    users: usersReducer,
    threads: threadReducer,
    comments: commentReducer,
    categories: categoriesReducer,
    voteThread: voteThreadReducer,
    voteComment: voteCommentReducer,
    leaderboard: leaderboardReducer,
  },
});

export default store;
