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
import IntegerInput, { StyledTextInput } from './IntegerInput';
import { encodeFunctionData } from 'viem';

const CHAIN_LIST = [fantomTestnet, avalancheFuji, moonbaseAlpha];

export default () => {
  const [glacis, setGlacis] = useState({});
  const [gmps, setGMPs] = useState({});
  const [chains, setChains] = useState({});
  const [quorum, setQuorum] = useState(1);
  const [message, setMessage] = useState("");

  // Options
  const glacisOptions = ["Redundancy", "Retries", "Quorum"];
  const gmpOptions = ["Axelar", "LayerZero", "Wormhole", "Hyperlane"];
  const chainOptions = ["Fantom", "Moonbase Alpha", "Avalanche"];

  // Disabled Options
  const glacisDisabled = ["Retries"];
  const gmpDisabled = ["Wormhole", "Hyperlane"];
  const chainDisabled = [];

  const handleGlacisOptions = (selections) => { setGlacis(selections) };
  const handleGMPOptions = (selections) => { setGMPs(selections) };
  const handleChainChange = (selections) => { setChains(selections) };
  const handleQuorumChange = (quorum) => {
    if (quorum <= 0) setQuorum(1);
    else setQuorum(quorum);
  };

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
  let proposalsArg = [];
  for (let chainName in chains) {
    if (!chains[chainName]) continue;
    const chainInfo = CHAIN_LIST.filter(x => x.name.toLowerCase().includes(chainName.toLowerCase())).pop();
    const daoInfo = daos.filter(x => x.chainName.toLowerCase().includes(chainName.toLowerCase())).pop();

    if (chainInfo && daoInfo) {
      // Create the payload to be used on the destination chain
      const payload = encodeFunctionData({
        abi: GlacisSampleDAOABI,
        functionName: 'selfConfig',
        args: [message]
      });

      // Insert Proposal info here
      proposalsArg.push({
        toChain: chainInfo.id,
        to: daoInfo.address,
        quorum: glacis.Quorum === true ? (quorum ?? gmpNums.length) : gmpNums.length,
        retry: glacis.Retries !== undefined,
        gmps: gmpNums,
        payload: payload
      });
    }
  }

  // Create the write hook
  const { config, error } = usePrepareContractWrite({
    address: DAO_ADDRESS, // TODO: fetch from slice (hardcoded fantom)
    abi: GlacisSampleDAOABI,
    functionName: 'propose',
    args: [proposalsArg],
    chainId: fantomTestnet.chainId,
    enabled: true,
  });
  if (error) console.log('Error for propose, usePrepareContractWrite error:', error)

  const { isSuccess, write, error: writeErr } = useContractWrite(config);

  // Refresh proposal data upon proposal finishing
  useEffect(() => {
    if (isSuccess) dispatch(fetchProposalData());
  }, [isSuccess]);

  // Check if is connected
  const { isConnected } = useAccount();
  const proposeButtonIsDisabled = proposalsArg.length == 0 || gmpNums.length == 0 || Object.entries(chains).length == 0 || !isConnected;

  return (
    <BigCard>
      <CardTitle style={{ textAlign: 'center' }}>Proposal Config</CardTitle>
      <ConfigContainer>
        <ConfigContainerTitle>Features</ConfigContainerTitle>
        <ConfigContainerTitle>GMPs</ConfigContainerTitle>
        <ConfigContainerTitle>Chains</ConfigContainerTitle>
      </ConfigContainer>
      <ConfigContainer>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          width: '100%'
        }}>
          <Checklist options={glacisOptions} disabled={glacisDisabled} onChange={handleGlacisOptions} />
          {glacis.Quorum === true && <IntegerInput style={{ marginTop: '10px' }} placeholder="Enter quorum" onChange={handleQuorumChange} />}
        </div>
        {glacis?.Redundancy ?
          <Checklist options={gmpOptions} disabled={gmpDisabled} onChange={(x) => handleGMPOptions(x)} /> :
          <RadioGroup options={gmpOptions} disabled={gmpDisabled} name="gmps" onChange={handleGMPOptions} />
        }
        <Checklist options={chainOptions} disabled={chainDisabled} onChange={handleChainChange} />
      </ConfigContainer>
      <ButtonContainer style={{ marginTop: '2rem' }}>
        <StyledTextInput placeholder="Enter message" value={message} onChange={(e) => { setMessage(e.target.value); }} />
        <StyledButton onClick={() => write?.()} disabled={proposeButtonIsDisabled}>
          {isConnected ? "Submit Proposal on Fantom" : "Please Connect to Fantom TestNet"}
        </StyledButton>
      </ButtonContainer>
    </BigCard>
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
