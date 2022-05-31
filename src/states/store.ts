import { configureStore } from '@reduxjs/toolkit';
import thunkMiddleware from 'redux-thunk';
import player from './playerSlice';
import test from './testSlice'
const store = configureStore({
  reducer: {
    player,
    test
  },
  // middleware: [thunkMiddleware]
});
export default store;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch