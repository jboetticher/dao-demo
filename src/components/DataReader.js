import React, { useEffect } from 'react';
import { DAO_ADDRESS } from '../constants';
import GlacisSampleDAOABI from '../abi/GlacisSampleDAO';

// REDUX
import { useDispatch } from 'react-redux';
import { fetchProposalData } from '../slices/proposalSlice';
import { setDAOInstances } from '../slices/daoSlice';

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
        address: DAO_ADDRESS,
        abi: GlacisSampleDAOABI,
        functionName: 'nextProposal',
        chainId: fantomTestnet.id
      },
      {
        address: DAO_ADDRESS,
        abi: GlacisSampleDAOABI,
        functionName: 'getDAOData',
        chainId: fantomTestnet.id
      },
      {
        address: DAO_ADDRESS,
        abi: GlacisSampleDAOABI,
        functionName: 'getDAOData',
        chainId: moonbaseAlpha.id
      },
      {
        address: DAO_ADDRESS,
        abi: GlacisSampleDAOABI,
        functionName: 'getDAOData',
        chainId: avalancheFuji.id
      },
    ],
    watch: true
  });

  // On Proposal # change or approval sent
  useEffect(() => {
    const nextProposalQuery = data?.[0];
    // console.log('Fetching proposal data after nextProposal query returned', nextProposalQuery);
    dispatch(fetchProposalData(nextProposalQuery));
  }, [data?.[0]]);

  // On DAO Data Changed
  useEffect(() => {
    const daoDataQuery = [data?.[1], data?.[2], data?.[3]];
    const formattedData = [];

    let queryNum = 0;
    for (let query of daoDataQuery) {
      queryNum++;
      if(query?.status !== 'success') continue;
      const daoData = query.result;
      formattedData.push({
        address: DAO_ADDRESS,
        members: daoData[0]?.toString(),       // This turns the array into a toString guys!
        proposals: daoData[1]?.toString(), 
        configNumber: daoData[2]?.toString(),
        chainName: [fantomTestnet.name, moonbaseAlpha.name, avalancheFuji.name][queryNum - 1]
      });
    }
    dispatch(setDAOInstances(formattedData));
  }, [data?.[1], data?.[2], data?.[3]]);

  return (<></>);
};

export default DataReader;
