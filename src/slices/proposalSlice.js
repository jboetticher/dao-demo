import { createSlice } from '@reduxjs/toolkit';

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
});

export const selectProposals = state => state.proposals;

export default proposalSlice.reducer;
