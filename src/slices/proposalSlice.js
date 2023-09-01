import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { readContract, multicall } from '@wagmi/core';
import { fantomTestnet } from 'wagmi/chains';
import { FANTOM_DAO_ADDRESS } from '../constants';
import GlacisSampleDAOABI from '../abi/GlacisSampleDAO';

export const proposalSlice = createSlice({
  name: 'proposals',
  initialState: {
    proposals: [

    ]
    // {
    //   to: '0x0394c0EdFcCA370B20622721985B577850B0eb75',
    //   chain: 'Moonbase Alpha',
    //   data: '0x1234567890123456789012345678901234567890123456789012345678901234567890',
    //   config: '00110000'
    // }
  },
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
          console.log('proposal payload', action.payload)
          const newState = [];

          for (let i in action.payload) {
            let x = action.payload[i];
            console.log(x)
            if(x.status === "success") {
              const data = {
                proposals: x.result[0],
                messageIds: x.result[1],
                votes: x.result[2],
                proposalId: i
              };

              newState.push(data);
            }
          }

          console.log('new proposal state', newState)

          _state.proposals = newState;
        }
      )
  }
});

// TODO: turn from async thunk into a hook because that allows it to watch

// An async thunk that fetches the data from the daos provided
export const fetchProposalData = createAsyncThunk(
  'proposals/fetchProposalData',
  async () => {
    // Get number of proposals
    const proposalNum = await readContract({
      address: FANTOM_DAO_ADDRESS,
      abi: GlacisSampleDAOABI,
      functionName: 'nextProposal',
      chainId: fantomTestnet.id
    });

    // TODO: use multicall to get all of the proposal information
    if (proposalNum > 0) {
      const calls = [];
      for (let i = 0; i < proposalNum; i++) {
        calls.push({
          address: FANTOM_DAO_ADDRESS,
          abi: GlacisSampleDAOABI,
          functionName: 'getProposalData',
          args: [i]
        });
      }

      const multicallRes = await multicall({
        contracts: calls,
        chainId: fantomTestnet.id
      });

      // Normalize to non big int
      for (let x of multicallRes) {
        if(x.status === "success") {
          for (let y of x.result[0]) {
            y.toChain = normalizeToNum(y.toChain);
          }
          x.result[2] = normalizeToNum(x.result[2]);
        }
      }
      console.log(multicallRes)
      
      return multicallRes;
    }

    return [];
  }
);

const normalizeToNum = (bigint) => parseInt(bigint.toString());

export const selectProposals = state => state.proposals.proposals;

export default proposalSlice.reducer;
