import { createSlice } from '@reduxjs/toolkit';

export const daoSlice = createSlice({
  name: 'dao',
  initialState: [
    {
        address: '0x8e36A1307C992b444de26286f2858071a247A357',
        chainName: 'Fantom Testnet',
        members: ['0x0394c0EdFcCA370B20622721985B577850B0eb75'],
        configNumber: 1
    },
    {
        address: '0x98891e5FD24Ef33A488A47101F65D212Ff6E650E',
        chainName: 'Moonbase Alpha',
        members: ['0x0394c0EdFcCA370B20622721985B577850B0eb75'],
        configNumber: 1
    },
    {
        address: '0x8e36A1307C992b444de26286f2858071a247A357',
        chainName: 'Avalanche Fuji',
        members: ['0x0394c0EdFcCA370B20622721985B577850B0eb75'],
        configNumber: 1
    }
  ],
  reducers: {
    // toggleOpened: state => {
    //   state.opened = !state.opened;
    // }
  },
});

export const selectDAOs = state => state.dao;

export default daoSlice.reducer;
