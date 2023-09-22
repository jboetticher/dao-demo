import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { readContract, multicall } from '@wagmi/core';
import { fantomTestnet } from 'wagmi/chains';
import { DAO_ADDRESS } from '../constants';
import GlacisSampleDAOABI from '../abi/GlacisSampleDAO';

export const proposalSlice = createSlice({
  name: 'proposals',
  initialState: {
    proposals: [],
    nextProposal: 0
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(
        fetchProposalData.fulfilled,
        (_state, action) => {
          if(action.payload?.length == 0) return;

          const newState = [];

          for (let i in action.payload) {
            let x = action.payload[i];
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

          _state.proposals = newState;
          _state.nextProposal = action.payload.length;

          console.log('set proposals to...', newState);
        }
      )
  }
});

const sleep = m => new Promise(r => setTimeout(r, m))

// An async thunk that fetches the data from the daos provided
export const fetchProposalData = createAsyncThunk(
  'proposals/fetchProposalData',
  async (nextProposalQuery) => {
    if(nextProposalQuery && nextProposalQuery.status === 'success' && nextProposalQuery.result > 0) {
      const proposalNum = nextProposalQuery.result;

      const calls = [];
      for (let i = 0; i < proposalNum; i++) {
        calls.push({
          address: DAO_ADDRESS,
          abi: GlacisSampleDAOABI,
          functionName: 'getProposalData',
          args: [i]
        });
      }

      // Sleep if that's in the parameters
      if(nextProposalQuery.wait && nextProposalQuery.wait > 0) await sleep(nextProposalQuery.wait);

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
      
      return multicallRes;
    }

    return [];
  }
);

const normalizeToNum = (bigint) => parseInt(bigint.toString());

export const selectProposals = state => state.proposals.proposals;
export const selectNextProposal = state => state.proposals.nextProposal;

export default proposalSlice.reducer;
