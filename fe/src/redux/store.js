import { configureStore } from '@reduxjs/toolkit';
import taskReducer from './taskSlice.js';

export const store = configureStore({
  reducer: {                          
    task:taskReducer
  }
})

export default store;