import styled from 'styled-components';
import { BigCard, ButtonContainer, CardTitle, StyledButton } from '../StyledComponents';
import Checklist from './Checklist';
import RadioGroup from './RadioGroup';
import { useEffect, useState } from 'react';
import { useContractWrite, usePrepareContractWrite, useAccount } from 'wagmi';
import { avalancheFuji, fantomTestnet, moonbaseAlpha } from 'wagmi/chains';
import GlacisSampleDAOABI from "../abi/GlacisSampleDAO.js";
import { useDispatch, useSelector } from 'react-redux';
import { selectDAOs } from '../slices/daoSlice';
import { fetchProposalData } from '../slices/proposalSlice';
import { DAO_ADDRESS } from '../constants';

const CHAIN_LIST = [fantomTestnet, avalancheFuji, moonbaseAlpha];

export default () => {
  const [glacis, setGlacis] = useState({});
  const [gmps, setGMPs] = useState({});
  const [chains, setChains] = useState({});

  // Options
  const glacisOptions = ["Redundancy", "Retries", "Quorum"];
  const gmpOptions = ["Axelar", "LayerZero", "Wormhole", "Hyperlane"];
  const chainOptions = ["Fantom", "Moonbase Alpha", "Avalanche"];

  // Disabled Options
  const glacisDisabled = ["Retries", "Quorum"];
  const gmpDisabled = ["LayerZero", "Wormhole", "Hyperlane"];
  const chainDisabled = ["Avalanche"];

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
  const { config, error } = usePrepareContractWrite({
    address: DAO_ADDRESS, // TODO: fetch from slice (hardcoded fantom)
    abi: GlacisSampleDAOABI,
    functionName: 'propose',
    args: args,
    chainId: fantomTestnet.chainId,
    enabled: true,
  });
  console.log('ugh error', error)

  const { isSuccess, write, error: writeErr } = useContractWrite(config);
  
  // Refresh proposal data upon proposal finishing
  useEffect(() => {
    if(isSuccess) dispatch(fetchProposalData());
  }, [isSuccess]);

  // Check if is connected
  const { isConnected } = useAccount();
  const proposeButtonIsDisabled = args.length == 0 || gmpNums.length == 0 || Object.entries(chains).length == 0 || !isConnected;

  return (
    <BigCard>
      <CardTitle style={{ textAlign: 'center' }}>Proposal Config</CardTitle>
      <ConfigContainer>
        <ConfigContainerTitle>Features</ConfigContainerTitle>
        <ConfigContainerTitle>GMPs</ConfigContainerTitle>
        <ConfigContainerTitle>Chains</ConfigContainerTitle>
      </ConfigContainer>
      <ConfigContainer>
        <Checklist options={glacisOptions} disabled={glacisDisabled} onChange={handleGlacisOptions} />
        {glacis?.Redundancy ?
          <Checklist options={gmpOptions} disabled={gmpDisabled} onChange={(x) => handleGMPOptions(x)} /> :
          <RadioGroup options={gmpOptions} disabled={gmpDisabled} name="gmps" onChange={handleGMPOptions} />
        }
        <Checklist options={chainOptions} disabled={chainDisabled} onChange={handleChainChange} />
      </ConfigContainer>
      <ButtonContainer style={{ marginTop: '2rem' }}>
        <StyledButton onClick={() => write?.()} disabled={proposeButtonIsDisabled}>
          {isConnected ? "Submit Proposal on Fantom" : "Please Connect to Fantom TestNet"}
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
