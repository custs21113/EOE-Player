import { configureStore } from '@reduxjs/toolkit';
import song from './songSlice';
import songlist from './songlistSlice';
export default configureStore({
  reducer: {
    song, 
    songlist
  },
});