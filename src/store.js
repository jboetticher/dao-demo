import { configureStore } from '@reduxjs/toolkit';
import proposalReducer from './slices/proposalSlice';
import daoReducer from './slices/daoSlice';

export const store = configureStore({
  reducer: {
    proposals: proposalReducer,
    dao: daoReducer
  },
});
