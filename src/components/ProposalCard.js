import React, { useEffect, useState } from 'react';
import {
  ProposalCard as StyledProposalCard, StyledButton,
  CardTitle, CardTable, CardRow, CardCell, CardCode,
  TableHeader, ExpandableSection
} from '../StyledComponents';
import DropdownButton from "./DropdownButton";
import { useContractWrite, usePrepareContractWrite, useChainId } from 'wagmi';
import { fantomTestnet } from 'wagmi/chains';
import { parseEther, decodeAbiParameters } from 'viem';
import { DAO_ADDRESS } from '../constants';
import GlacisSampleDAOABI from '../abi/GlacisSampleDAO';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProposalData, selectNextProposal, selectMessageIDs } from '../slices/proposalSlice';

import { Grid, IconButton, Tooltip } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import Card from './container/Card';
import GlacisModal from './GlacisModal';
import ReactSimplyCarousel from 'react-simply-carousel';

import "../styles/ProposalCard.css";

const GMP_TO_STRING = {
  1: "Axelar",
  2: "LayerZero",
  3: "Wormhole",
  4: "Hyperlane"
};
const GMP_TO_IMAGE = {
  1: "gmp_logo/axelar.png",
  2: "gmp_logo/layerzero.png",
  3: "gmp_logo/wormhole.png",
  4: "gmp_logo/axelar.png",
};
const CHAINID_TO_NAME = {
  97: "BSC TestNet",
  1287: "Moonbase Alpha",
  43113: "Avalanche Fuji",
  4002: "Fantom TestNet"

};
const CHAINID_TO_IMAGE = {
  97: "chain_logo/bsc-logo.png",
  1287: "chain_logo/moonbase-alpha-logo.png",
  43113: "chain_logo/avalanche-logo.png",
  4002: "chain_logo/fantom-logo.png"
};
const CONFIG_TEXT_SIGNATURE = '0x6c1a499c';

const ProposalCard = ({ proposal, onlyRetry }) => {
  const dispatch = useDispatch();
  const [opened, setOpened] = useState(false);
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);

  const nextProposal = useSelector(selectNextProposal);
  const messageIDs = useSelector(selectMessageIDs);

  const [openModal, setOpenModal] = useState(false);
  const handleOpen = () => setOpenModal(true);
  const handleClose = () => setOpenModal(false);

  const value = (() => {
    let v;
    if (proposal == null || proposal.proposals == null || proposal.proposals.length == 0) v = parseEther("0.5");
    else v = parseEther((0.5 * proposal.proposals.length * proposal.proposals[0].gmps.length).toString());
    return v;
  })();

  const chainId = useChainId();
  const { config, error } = usePrepareContractWrite({
    address: DAO_ADDRESS,
    abi: GlacisSampleDAOABI,
    functionName: 'approve',
    args: [parseInt(proposal.proposalId)],
    chainId: fantomTestnet.chainId,
    value
  });

  if (error) console.log(`Error for approve of proposal ${proposal.proposalId}, usePrepareContractWrite error:`, error);

  const { write, error: writeErr, isSuccess, data: writeResult } = useContractWrite(config);

  useEffect(() => {
    if (isSuccess !== true) return;

    for (let toChain of proposal.proposals) {
      for (let gmp of toChain.gmps) {
        if (gmp === 1) {
          window.open(`https://testnet.axelarscan.io/gmp/${writeResult.hash}`, '_blank');
        }
        else if (gmp === 2) {
          window.open(`https://testnet.layerzeroscan.com/`, '_blank');
        }
        else if (gmp === 3) {
          window.open(`https://wormholescan.io/#/tx/${writeResult.hash}?network=TESTNET`)
        }
      }
    }

    dispatch(fetchProposalData({ status: 'success', result: nextProposal, wait: 3000 }));
  }, [isSuccess]);

  const route = proposal.proposals[0];

  const GMPsAndChains = <div className='logos'>
    <div style={{ flex: 0.5 }}>
      <h3 className='logoTitle'>GMPs</h3>
      <div className='logoContainer'>
        {route.gmps.map(gmpID => <Tooltip title={GMP_TO_STRING[gmpID]} key={gmpID}>
          <img
            src={GMP_TO_IMAGE[gmpID]}
            height={32}
            width={32}
            alt={GMP_TO_STRING[gmpID]} />
        </Tooltip>
        )}
      </div>
    </div>
    <div style={{ flex: 0.5 }}>
      <h3 className='logoTitle'>CHAINS</h3>
      <div className='logoContainer'>
        {proposal.proposals.map(p => p.toChain).map(gmpID => <Tooltip title={CHAINID_TO_NAME[gmpID]} key={gmpID}>
          <img
            src={CHAINID_TO_IMAGE[gmpID]}
            height={32}
            width={32}
            alt={CHAINID_TO_NAME[gmpID]} />
        </Tooltip>
        )}
      </div>
    </div>
  </div>;

  // Assume proposal is an object with relevant data
  return (
    <Grid item sm={12}>
      <Card>
        <div style={{ display: 'flex', marginBottom: '1rem', alignItems: 'center' }}>
          <CardTitle style={{ width: '100%', marginBottom: 0 }}>Proposal {proposal.proposalId}</CardTitle>
          <IconButton
            sx={{
              color: 'white',
              ":hover": {
                color: 'var(--orange)'
              }
            }}
            onClick={handleOpen}
          >
            <InfoIcon />
          </IconButton>
          {!onlyRetry && <StyledButton style={{ marginLeft: '12px' }} onClick={write}>Approve</StyledButton>}
          <DropdownButton onClick={() => { setOpened(!opened) }} opened={opened}></DropdownButton>
        </div>
        <ExpandableSection opened={opened}>
          {GMPsAndChains}
          <CardTable style={{ marginTop: '1rem' }}>
            <tbody>
              {route?.calldataPayload.startsWith(CONFIG_TEXT_SIGNATURE) ?
                <CardRow>
                  <CardCell>Config String:</CardCell>
                  <CardCell>
                    <CardCode>
                      {decodeAbiParameters(
                        [{ name: 'x', type: 'string' }],
                        '0x' + route?.calldataPayload.slice(CONFIG_TEXT_SIGNATURE.length)
                      )[0]}
                    </CardCode>
                  </CardCell>
                </CardRow> :
                <CardRow>
                  <CardCell>Calldata:</CardCell>
                  <CardCell><CardCode>{route?.payload}</CardCode></CardCell>
                </CardRow>
              }
            </tbody>
          </CardTable>
          {onlyRetry && proposal.proposals.map((p, i) => (
            <React.Fragment key={i}>
              <TableHeader withbutton={onlyRetry?.toString()}>
                <div>Cross-Chain Message {i + 1} (to {CHAINID_TO_NAME[p.toChain]})</div>
                {onlyRetry && (
                  p.retriable ? <RetryButton id={proposal.proposalId} index={i} nonce={messageIDs[proposal.messageIds[i]]} />
                    : <StyledButton disabled={true}>No Retry</StyledButton>
                )}
              </TableHeader>
            </React.Fragment>
          ))}
        </ExpandableSection>
      </Card>
      <GlacisModal open={openModal} handleClose={handleClose} title={'Proposal ' + proposal.proposalId}>
        {GMPsAndChains}
        <CardTable style={{ marginTop: '1rem' }}>
          <tbody>
            <CardRow>
              <CardCell>Retriable:</CardCell>
              <CardCell><CardCode>{route?.retriable ? 'True' : 'False'}</CardCode></CardCell>
            </CardRow>
            <CardRow>
              <CardCell>Votes:</CardCell>
              <CardCell><CardCode>{proposal.votes}</CardCode></CardCell>
            </CardRow>
            <CardRow>
              <CardCell>Final To:</CardCell>
              <CardCell><CardCode>{route?.finalTo}</CardCode></CardCell>
            </CardRow>
            <CardRow>
              <CardCell>Calldata:</CardCell>
              <CardCell><CardCode>{route?.calldataPayload}</CardCode></CardCell>
            </CardRow>
          </tbody>
        </CardTable>
      </GlacisModal>
    </Grid>
  );
};

export default ProposalCard;

function RetryButton({ id, index, nonce }) {
  const { config, error } = usePrepareContractWrite({
    address: DAO_ADDRESS,
    abi: GlacisSampleDAOABI,
    functionName: 'retry',
    args: [parseInt(id), index, nonce],
    chainId: fantomTestnet.chainId,
    enabled: true,
    value: parseEther("1.5")
  });

  if (error) console.log(
    `RetryButton (proposal: ${id}, index: ${index}) usePrepareContractWrite error:`, error
  );

  const { write, error: writeErr, isSuccess, data: writeResult } = useContractWrite(config);

  if (writeErr) console.log(
    `RetryButton (proposal: ${id}, index: ${index}) useContractWrite error:`, writeErr
  );
  return (
    <StyledButton onClick={write}>
      Retry
    </StyledButton>
  )
}
