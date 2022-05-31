import { configureStore } from '@reduxjs/toolkit';
import thunkMiddleware from 'redux-thunk';
import player from './playerSlice';
export default configureStore({
  reducer: {
    player
  },
  // middleware: [thunkMiddleware]
});