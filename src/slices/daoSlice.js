import { createSlice, createAsyncThunk, current } from '@reduxjs/toolkit';
import { readContract } from '@wagmi/core';
import GlacisSampleDAOABI from '../abi/GlacisSampleDAO';

export const daoSlice = createSlice({
  name: 'dao',
  initialState: {
    instances: [
      {
        address: '0xbCF59D6928ec2454262675Ab116508CB3fE17757',
        chainName: 'Fantom Testnet',
        proposals: 0,
        members: ['0x0394c0EdFcCA370B20622721985B577850B0eb75'],
        configNumber: 1
      },
      {
        address: '0x0F3C8d93857Cc55499e3eE8bAA0a20488D1888C7',
        chainName: 'Moonbase Alpha',
        proposals: 0,
        members: ['0x0394c0EdFcCA370B20622721985B577850B0eb75'],
        configNumber: 1
      }
    ]
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(
        fetchDAOData.fulfilled,
        (_state, action) => {
          const state = current(_state);

          // stupid deep copy because current(x) is immutable
          const updateableInstances = [];
          for (const d of state.instances) {
            const e = {};
            for (const f in d) {
              e[f] = d[f]
            }
            updateableInstances.push(e);
          }

          // add to that data
          for (const updatedData of action.payload) {
            const { address } = updatedData;

            const daoToUpdate = updateableInstances.find(dao => dao.address === address);

            if (daoToUpdate) {
              Object.assign(daoToUpdate, updatedData);
            }
          }

          _state.instances = updateableInstances;
        }
      )
  },
});

// An async thunk that fetches the data from the daos provided
export const fetchDAOData = createAsyncThunk(
  'dao/fetchDAOData',
  async (daoAddresses) => {
    const data = [];
    for (let id in daoAddresses) {
      const daoData = await readContract({
        address: daoAddresses[id],
        abi: GlacisSampleDAOABI,
        functionName: 'getDAOData',
        chainId: parseInt(id)
      });

      data.push({
        address: daoAddresses[id],
        members: daoData[0].toString(),       // This turns the array into a toString guys!
        proposals: daoData[1].toString(), 
        configNumber: daoData[2].toString(),
      });
    }
    return data;
  }
);


export const selectDAOs = state => state.dao.instances;

export default daoSlice.reducer;
