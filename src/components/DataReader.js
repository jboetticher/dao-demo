import React, { useEffect } from 'react';
import { FANTOM_DAO_ADDRESS } from '../constants';
import GlacisSampleDAOABI from '../abi/GlacisSampleDAO';

// REDUX
import { useSelector, useDispatch } from 'react-redux';
import { selectProposals } from '../slices/proposalSlice';
import { selectDAOs, fetchDAOData } from '../slices/daoSlice';
import { fetchProposalData } from '../slices/proposalSlice';

// WAGMI
import { fantomTestnet, avalancheFuji, moonbaseAlpha } from 'wagmi/chains';
import { useContractReads } from 'wagmi';

const DataReader = () => {
  const dispatch = useDispatch();
  //   const proposals = useSelector(selectProposals);
  //   const daos = useSelector(selectDAOs);

  // The reason we use hooks is so that we can constantly poll for data.
  // This is the preliminary data that we read. If this data ever changes, then we would
  // want to requery a lot of other things.
  const { data, isError, isLoading } = useContractReads({
    contracts: [
      {
        address: FANTOM_DAO_ADDRESS,
        abi: GlacisSampleDAOABI,
        functionName: 'nextProposal',
        chainId: fantomTestnet.id
      }
    ],
    watch: true
  });
  const nextProposalQuery = data?.[0];

  // On Proposal # change or approval sent
  useEffect(() => {
    console.log('Fetching proposal data after nextProposal query returned', nextProposalQuery);
    dispatch(fetchProposalData(nextProposalQuery));
  }, [nextProposalQuery, /* TODO: figure out how to trigger based on approval sent */]);

  return (<></>);
};

export default DataReader;
