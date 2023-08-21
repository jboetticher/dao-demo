import { configureStore, applyMiddleware } from '@reduxjs/toolkit';
import proposalReducer from './slices/proposalSlice';
import daoReducer from './slices/daoSlice';
import thunk from 'redux-thunk';

export const store = configureStore(
  {
    reducer: {
      proposals: proposalReducer,
      dao: daoReducer
    }
  },
  applyMiddleware(thunk)
);
