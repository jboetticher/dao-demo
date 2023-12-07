import styled from 'styled-components';
import { ButtonContainer, StyledButton } from '../StyledComponents';
import Checklist from './Checklist';
import RadioGroup from './RadioGroup';
import { useEffect, useState } from 'react';
import { useContractWrite, usePrepareContractWrite, useAccount } from 'wagmi';
import { fantomTestnet, bscTestnet, moonbaseAlpha } from 'wagmi/chains';
import GlacisSampleDAOABI from "../abi/GlacisSampleDAO.js";
import { useDispatch, useSelector } from 'react-redux';
import { selectDAOs } from '../slices/daoSlice';
import { fetchProposalData } from '../slices/proposalSlice';
import { DAO_ADDRESS } from '../constants';
import { StyledTextInput } from './IntegerInput';
import { encodeFunctionData } from 'viem';
import Card from './container/Card';
import { Grid, Tabs, Tab, Box, CardContent } from '@mui/material';
import GlacisModal from './GlacisModal.js';

const CHAIN_LIST = [fantomTestnet, moonbaseAlpha, bscTestnet];

export default () => {
  // Local state
  const [glacis, setGlacis] = useState({});
  const [gmps, setGMPs] = useState({});
  const [chains, setChains] = useState({});
  const [openModal, setOpenModal] = useState(false);

  // Local tabs state
  const [selectedTab, setSelectedTab] = useState(0);
  const [message, setMessage] = useState("");
  const [customCallTo, setCustomCallTo] = useState("");
  const [customCalldata, setCustomCalldata] = useState("");

  // Redux data
  const daos = useSelector(selectDAOs);
  const dispatch = useDispatch();

  // Options
  const glacisOptions = ["Redundancy", "Retries"];
  const gmpOptions = ["Axelar", "LayerZero", "Wormhole", "Hyperlane"];
  const chainOptions = ["Fantom TestNet", "Moonbase Alpha", "Binance"];

  // Disabled Options
  const glacisDisabled = [];
  const gmpDisabled = ["Hyperlane"];
  const chainDisabled = [];

  // Callbacks
  const handleGMPOptions = (selections) => { setGMPs(selections) };

  // Find available GMP IDs
  const gmpNums = createGMPArray(gmps, gmpOptions);

  // Create args for the proposal
  let proposalsArg;
  switch (selectedTab) {
    case 2: {
      proposalsArg =
        createCustomCallProposalArgs(chains, daos, customCalldata, customCallTo, glacis.Retries !== undefined, gmpNums)
      break;
    };
    default: {
      proposalsArg =
        createConfigProposalArgs(chains, daos, message, glacis.Retries !== undefined, gmpNums);
      break;
    }
  }

  // Create the write hook
  const { config, error } = usePrepareContractWrite({
    address: DAO_ADDRESS, // TODO: fetch from slice (hardcoded moonbase)
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

  // Create the modal JSX (main logic interface)
  const tabStyling = { color: 'white', '&.Mui-selected': { color: 'white', textShadow: '1px 1px var(--orange)' } };
  const CreateConfigModal = <GlacisModal title={'Craft Proposal'}
    open={openModal} handleClose={() => setOpenModal(false)}
    sx={{
      minWidth: '50%'
    }}
  >
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
        <Checklist options={glacisOptions} disabled={glacisDisabled} onChange={(selections) => { setGlacis(selections); }} />
      </div>
      {glacis?.Redundancy ?
        <Checklist options={gmpOptions} disabled={gmpDisabled} onChange={(x) => handleGMPOptions(x)} /> :
        <RadioGroup options={gmpOptions} disabled={gmpDisabled} name="gmps" onChange={handleGMPOptions} />}
      <Checklist options={chainOptions} disabled={chainDisabled} onChange={(selections) => { setChains(selections); }} />
    </ConfigContainer>
    <Box>
      <Tabs value={selectedTab}
        onChange={(_, v) => { setSelectedTab(v) }}
        TabIndicatorProps={{
          style: {
            backgroundColor: 'var(--orange)', // Change color of the indicator
          }
        }}
      >
        <Tab label="Config Message" sx={tabStyling} />
        <Tab label="Send Token" sx={tabStyling} />
        <Tab label="Custom Call" sx={tabStyling} />
      </Tabs>
      <div style={{ height: '200px', paddingTop: '8px', color: 'white' }}>
        {selectedTab === 0 && (
          <>
            <div style={{ paddingBottom: '8px' }}>Updates a DAO's config message and increases the config version.</div>
            <StyledTextInput placeholder="Enter message"
              value={message}
              style={{ width: '100%', boxSizing: 'border-box' }}
              onChange={(e) => { setMessage(e.target.value); }}
            />
          </>
        )}
        {selectedTab === 1 && (
          <div>~ In Development ~</div>
        )}
        {selectedTab === 2 && (
          <>
            <div style={{ paddingBottom: '8px' }}>Interacts with a smart contract.</div>
            <StyledTextInput placeholder="Destination address"
              value={message}
              style={{ width: '100%', boxSizing: 'border-box' }}
              onChange={(e) => { setCustomCallTo(e.target.value); }}
            />
            <StyledTextInput placeholder="Calldata"
              value={message}
              style={{ width: '100%', boxSizing: 'border-box' }}
              onChange={(e) => { setCustomCalldata(e.target.value); }}
            />
          </>
        )}
      </div>
    </Box>
    <ButtonContainer style={{ marginTop: '2rem' }}>
      <StyledButton onClick={() => write?.()} disabled={proposeButtonIsDisabled}>
        {isConnected ? "Propose on Moonbase" : "Please Connect to Moonbase Alpha"}
      </StyledButton>
    </ButtonContainer>
  </GlacisModal>;

  return (
    <Grid item sm={12}>
      <Card>
        <ButtonContainer style={{ marginTop: 0 }}>
          <StyledButton onClick={() => setOpenModal(true)} disabled={!isConnected}>
            {isConnected ? "Craft Proposal" : "Connect to Moonbase Alpha to Propose"}
          </StyledButton>
        </ButtonContainer>
        {CreateConfigModal}
      </Card>
    </Grid>
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
  color: white;
`;

function createGMPArray(gmps, gmpOptions) {
  const gmpNums = [];
  if (typeof (gmps) === 'object') {
    for (let gmp of Object.keys(gmps))
      for (let i = 0; i < gmpOptions.length; i++)
        if (gmpOptions[i] === gmp) gmpNums.push(i + 1);
  }

  else
    for (let i = 0; i < gmpOptions.length; i++)
      if (gmpOptions[i] === gmps) gmpNums.push(i + 1);
  return gmpNums;
}

/// Creates the config proposal argument
function createConfigProposalArgs(chains, daos, message, retriesEnabled, gmpNums) {
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
        retriable: retriesEnabled !== undefined,
        gmps: gmpNums,
        payload: payload
      });
    }
  }
  return proposalsArg;
}

function createCustomCallProposalArgs(chains, daos, calldata, address, glacis, gmpNums) {

}

