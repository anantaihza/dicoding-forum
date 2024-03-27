import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import usersReducer from '../features/users/usersSlice';
import threadReducer from '../features/threads/threadsSlice';
import categoriesReducer from '../features/categories/categoriesSlice';
import leaderboardReducer from '../features/leaderboard/leaderboardSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    users: usersReducer,
    threads: threadReducer,
    categories: categoriesReducer,
    leaderboard: leaderboardReducer,
  },
});

export default store;
