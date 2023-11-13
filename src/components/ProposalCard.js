import React, { useEffect, useState } from 'react';
import {
  ProposalCard as StyledProposalCard, StyledButton,
  CardTitle, CardTable, CardRow, CardCell, CardCode,
  TableHeader, ExpandableSection
} from '../StyledComponents';
import DropdownButton from "./DropdownButton";
import { useContractWrite, usePrepareContractWrite, useChainId } from 'wagmi';
import { moonbaseAlpha } from 'wagmi/chains';
import { parseEther, decodeAbiParameters } from 'viem';
import { DAO_ADDRESS } from '../constants';
import GlacisSampleDAOABI from '../abi/GlacisSampleDAO';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProposalData, selectNextProposal, selectMessageIDs } from '../slices/proposalSlice';

import { Grid, IconButton, Modal, Box, Tooltip } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import Card from './container/Card';

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
  43113: "Avalanche Fuji"
};
const CHAINID_TO_IMAGE = {
  97: "chain_logo/bsc-logo.png",
  1287: "chain_logo/moonbase-alpha-logo.png",
  43113: "chain_logo/avalanche-logo.png"
};
const CONFIG_TEXT_SIGNATURE = '0x6c1a499c';

const ProposalCard = ({ proposal, onlyRetry }) => {
  const dispatch = useDispatch();
  const [opened, setOpened] = useState(false);

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
    chainId: moonbaseAlpha.chainId,
    enabled: chainId === moonbaseAlpha.chainId,
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
      }
    }

    dispatch(fetchProposalData({ status: 'success', result: nextProposal, wait: 3000 }));
  }, [isSuccess]);

  const route = proposal.proposals[0];

  // Assume proposal is an object with relevant data
  return (
    <Grid item sm={12}>
      <Card>
        <div style={{ display: 'flex', marginBottom: '1rem', alignItems: 'center' }}>
          <CardTitle style={{ width: '100%', marginBottom: 0 }}>Proposal {proposal.proposalId}</CardTitle>
          {!onlyRetry && <StyledButton onClick={write}>Approve</StyledButton>}
          <IconButton
            sx={{
              position: 'absolute', top: 17, right: 174, color: 'white', ":hover": {
                color: 'var(--orange)'
              }
            }}
            onClick={handleOpen}
          >
            <InfoIcon />
          </IconButton>
          <DropdownButton onClick={() => { setOpened(!opened) }} opened={opened}></DropdownButton>
        </div>
        <ExpandableSection opened={opened}>
          <div className='logos'>
            <div style={{ flex: 0.5 }}>
              <h3 className='logoTitle'>GMPs</h3>
              <div className='logoContainer'>
                {route.gmps.map(gmpID =>
                  <Tooltip title={GMP_TO_STRING[gmpID]} key={gmpID}>
                    <img
                      src={GMP_TO_IMAGE[gmpID]}
                      height={32}
                      width={32}
                      alt={GMP_TO_STRING[gmpID]}
                    />
                  </Tooltip>
                )}
              </div>
            </div>
            <div style={{ flex: 0.5 }}>
              <h3 className='logoTitle'>CHAINS</h3>
              <div className='logoContainer'>
                {proposal.proposals.map(p => p.toChain).map(gmpID =>
                  <Tooltip title={CHAINID_TO_NAME[gmpID]} key={gmpID}>
                    <img
                      src={CHAINID_TO_IMAGE[gmpID]}
                      height={32}
                      width={32}
                      alt={CHAINID_TO_NAME[gmpID]}
                    />
                  </Tooltip>
                )}
              </div>
            </div>
          </div>
          <CardTable style={{ marginTop: '1rem' }}>
            <tbody>
              {route?.payload.startsWith(CONFIG_TEXT_SIGNATURE) ?
                <CardRow>
                  <CardCell>Config String:</CardCell>
                  <CardCell>
                    <CardCode>
                      {decodeAbiParameters(
                        [{ name: 'x', type: 'string' }],
                        '0x' + route?.payload.slice(CONFIG_TEXT_SIGNATURE.length)
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
                  p.retry ? <RetryButton id={proposal.proposalId} index={i} nonce={messageIDs[proposal.messageIds[i]]} />
                    : <StyledButton disabled={true}>No Retry</StyledButton>
                )}
              </TableHeader>
            </React.Fragment>
          ))}
        </ExpandableSection>
      </Card>
      <ProposalModal open={openModal} handleClose={handleClose} proposal={proposal} />
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
    chainId: moonbaseAlpha.chainId,
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

function ProposalModal({ open, handleClose, proposal }) {
  const p = proposal[0];

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="dao-modal-title"
      aria-describedby="dao-modal-description"
    >
      <Box sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400, // Adjust the size as needed
        bgcolor: 'var(--green)',
        boxShadow: 24,
        p: 4,
        borderRadius: 1, // Adjust the border radius as needed
      }}>
        {/* Modal content goes here */}
        <h2 id="dao-modal-title">Modal Settings</h2>
        <CardTable>
          <tbody>
            <CardRow>
              <CardCell>To:</CardCell>
              <CardCell><CardCode>{p?.to}</CardCode></CardCell>
            </CardRow>
            <CardRow>
              <CardCell>Data:</CardCell>
              <CardCell><CardCode>{p?.payload}</CardCode></CardCell>
            </CardRow>
            <CardRow>
              <CardCell>GMPs:</CardCell>
              <CardCell>
                <CardCode>
                  {p?.gmps.map(gmpID => GMP_TO_STRING[gmpID]).join(', ')}
                </CardCode>
              </CardCell>
            </CardRow>
          </tbody>
        </CardTable>
        {/* Close button or any other elements */}
      </Box>
    </Modal>
  );
}