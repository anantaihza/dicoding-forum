import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import usersReducer from '../features/users/usersSlice';
import threadReducer from '../features/threads/threadsSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    users: usersReducer,
    threads: threadReducer,
  },
});

export default store;
