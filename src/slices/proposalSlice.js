import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { readContract, multicall } from '@wagmi/core';
import { fantomTestnet } from 'wagmi/chains';
import { FANTOM_DAO_ADDRESS } from '../constants';
import GlacisSampleDAOABI from '../abi/GlacisSampleDAO';

export const proposalSlice = createSlice({
  name: 'proposals',
  initialState: [
    {
      to: '0x0394c0EdFcCA370B20622721985B577850B0eb75',
      chain: 'Moonbase Alpha',
      data: '0x1234567890123456789012345678901234567890123456789012345678901234567890',
      config: '00110000'
    }
  ],
  reducers: {
    // toggleOpened: state => {
    //   state.opened = !state.opened;
    // }
  },
  extraReducers: (builder) => {
    builder
      .addCase(
        fetchProposalData.fulfilled,
        (_state, action) => {
          // const state = current(_state);

          // // stupid deep copy because current(x) is immutable
          // const updateableInstances = [];
          // for (const d of state.instances) {
          //   const e = {};
          //   for (const f in d) {
          //     e[f] = d[f]
          //   }
          //   updateableInstances.push(e);
          // }

          // // add to that data
          // for (const updatedData of action.payload) {
          //   const { address } = updatedData;

          //   const daoToUpdate = updateableInstances.find(dao => dao.address === address);

          //   if (daoToUpdate) {
          //     Object.assign(daoToUpdate, updatedData);
          //   }
          // }

          _state = [];
        }
      )
  }
});


// An async thunk that fetches the data from the daos provided
export const fetchProposalData = createAsyncThunk(
  'proposals/fetchProposalData',
  async (daoAddresses) => {
    // Get number of proposals
    const proposalNum = await readContract({
      address: FANTOM_DAO_ADDRESS,
      abi: GlacisSampleDAOABI,
      functionName: 'nextProposal',
      chainId: parseInt(fantomTestnet.id)
    });

    // TODO: use multicall to get all of the proposal information
    if (proposalNum > new 0) {
      console.log('a proposal was found!')
      // const res = await multicall()
    }

    console.log('Proposal Num:', typeof (proposalNum), proposalNum);
    return proposalNum;
  }
);


export const selectProposals = state => state.proposals;

export default proposalSlice.reducer;
