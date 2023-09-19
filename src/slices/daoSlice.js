import { createSlice, createAsyncThunk, current } from '@reduxjs/toolkit';
import { readContract } from '@wagmi/core';
import GlacisSampleDAOABI from '../abi/GlacisSampleDAO';
import { DAO_ADDRESS } from '../constants';

export const daoSlice = createSlice({
  name: 'dao',
  initialState: {
    instances: [
      {
        address: DAO_ADDRESS,
        chainName: 'Fantom Testnet',
        proposals: 0,
        members: ['0x0394c0EdFcCA370B20622721985B577850B0eb75'],
        configText: "",
        configVersion: 0
      },
      {
        address: DAO_ADDRESS,
        chainName: 'Moonbase Alpha',
        proposals: 0,
        members: ['0x0394c0EdFcCA370B20622721985B577850B0eb75'],
        configText: "",
        configVersion: 0
      },
      {
        address: DAO_ADDRESS,
        chainName: 'Avalanche Fuji',
        proposals: 0,
        members: ['0x0394c0EdFcCA370B20622721985B577850B0eb75'],
        configText: "",
        configVersion: 0
      }
    ]
  },
  reducers: {
    setDAOInstances: (state, action) => {
      state.instances = action.payload;
    }
  }
});

export const selectDAOs = state => state.dao.instances;
export const { setDAOInstances } = daoSlice.actions;

export default daoSlice.reducer;
