import styled from 'styled-components';
import { BigCard, ButtonContainer, CardTitle, StyledButton } from '../StyledComponents';
import Checklist from './Checklist';
import RadioGroup from './RadioGroup';
import { useEffect, useState } from 'react';
import { useContractWrite, usePrepareContractWrite, } from 'wagmi';
import { avalancheFuji, fantomTestnet, moonbaseAlpha } from 'wagmi/chains';
import GlacisSampleDAOABI from "../abi/GlacisSampleDAO.js";
import { useDispatch, useSelector } from 'react-redux';
import { selectDAOs } from '../slices/daoSlice';
import { fetchProposalData } from '../slices/proposalSlice';
import { FANTOM_DAO_ADDRESS } from '../constants';

const CHAIN_LIST = [avalancheFuji, moonbaseAlpha];

export default () => {
  const [glacis, setGlacis] = useState({});
  const [gmps, setGMPs] = useState({});
  const [chains, setChains] = useState({});

  const glacisOptions = ["Redundancy", "Retries"];
  const gmpOptions = ["Axelar", "LayerZero", "Wormhole"];
  const chainOptions = ["Moonbase Alpha", "Avalanche"];

  const handleGlacisOptions = (selections) => { setGlacis(selections) };
  const handleGMPOptions = (selections) => { setGMPs(selections) };
  const handleChainChange = (selections) => { setChains(selections) };

  const daos = useSelector(selectDAOs);
  const dispatch = useDispatch();

  // Create GMP IDs
  const gmpNums = [];
  if (typeof (gmps) === 'object') {
    for (let gmp of Object.keys(gmps))
      for (let i = 0; i < gmpOptions.length; i++)
        if (gmpOptions[i] === gmp) gmpNums.push(i + 1);
  }
  else
    for (let i = 0; i < gmpOptions.length; i++)
      if (gmpOptions[i] === gmps) gmpNums.push(i + 1)

  // Create args for the proposal
  let args = [];
  for (let chainName in chains) {
    const chainInfo = CHAIN_LIST.filter(x => x.name.toLowerCase().includes(chainName.toLowerCase())).pop();
    const daoInfo = daos.filter(x => x.chainName.toLowerCase().includes(chainName.toLowerCase())).pop();

    if (chainInfo && daoInfo) {
      // Insert Proposal info here
      args.push([{
        toChain: chainInfo.id,
        to: daoInfo.address,
        quorum: gmpNums.length,
        retry: glacis.Retries !== undefined,
        gmps: gmpNums,
        payload: "0x937cb06a"                   // selfConfig() selector
      }]);
    }
  }

  // Create the write hook
  const { config } = usePrepareContractWrite({
    address: FANTOM_DAO_ADDRESS, // TODO: fetch from slice (hardcoded fantom)
    abi: GlacisSampleDAOABI,
    functionName: 'propose',
    args: args,
    chainId: fantomTestnet.chainId,
    enabled: true,
  })
  const { data, isLoading, isSuccess, write, error: writeErr } = useContractWrite(config);

  // Refresh proposal data upon proposal finishing
  useEffect(() => {
    if(isSuccess) dispatch(fetchProposalData());
  }, [isSuccess]);

  return (
    <BigCard>
      <CardTitle style={{ textAlign: 'center' }}>Proposal Config</CardTitle>
      <ConfigContainer>
        <ConfigContainerTitle>Features</ConfigContainerTitle>
        <ConfigContainerTitle>GMPs</ConfigContainerTitle>
        <ConfigContainerTitle>Chains</ConfigContainerTitle>
      </ConfigContainer>
      <ConfigContainer>
        <Checklist options={glacisOptions} onChange={handleGlacisOptions} />
        {glacis?.Redundancy ?
          <Checklist options={gmpOptions} onChange={(x) => handleGMPOptions(x)} /> :
          <RadioGroup options={gmpOptions} name="gmps" onChange={handleGMPOptions} />
        }
        <Checklist options={chainOptions} onChange={handleChainChange} />
      </ConfigContainer>
      <ButtonContainer style={{ marginTop: '2rem' }}>
        <StyledButton onClick={() => write?.()} disabled={args.length == 0 || gmpNums.length == 0}>
          Submit Proposal on Fantom
        </StyledButton>
      </ButtonContainer>
    </BigCard >
  )
}

export const ConfigContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: flex-start;
`;

const ConfigContainerTitle = styled.h3`
  width: 50%;
`;
