import React, { useEffect, useState } from 'react';
import {
  ProposalCard as StyledProposalCard, StyledButton,
  CardTitle, CardTable, CardRow, CardCell, CardCode,
  TableHeader, ExpandableSection, ButtonContainer
} from '../StyledComponents';
import DropdownButton from "./DropdownButton";
import { useContractWrite, usePrepareContractWrite, useChainId } from 'wagmi';
import { fantomTestnet } from 'wagmi/chains';
import { parseEther, formatEther, decodeAbiParameters } from 'viem';
import { DAO_ADDRESS } from '../constants';
import GlacisSampleDAOABI from '../abi/GlacisSampleDAO';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProposalData, selectNextProposal, selectMessageIDs } from '../slices/proposalSlice';

import { Grid, IconButton, Tooltip, InputAdornment } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import Card from './container/Card';
import GlacisModal from './GlacisModal';
import NumberInput from './NumberInput';

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

  const nextProposal = useSelector(selectNextProposal);
  const messageIDs = useSelector(selectMessageIDs);

  const [openInfoModal, setOpenInfoModal] = useState(false);
  const [openApproveModal, setOpenApproveModal] = useState(false);
  const [fees, setFees] = useState(suggestFees(proposal));
  const [value, setValue] = useState(suggestFees(proposal).flat().reduce((acc, cur) => acc + cur));

  // Update fees
  function handleFeeMenuChange(messageIndex, gmpIndex) {
    return (e) => {
      let feeCopy = fees;
      let indexCopy = feeCopy[messageIndex];

      indexCopy[gmpIndex] = parseEther(e.target.value);

      // Find new sum
      let sum = 0n;
      for (let f of feeCopy) {
        for (let x of f) {
          sum += x;
        }
      }

      setValue(sum);
      setFees(feeCopy);
    }
  }

  const { config, error } = usePrepareContractWrite({
    address: DAO_ADDRESS,
    abi: GlacisSampleDAOABI,
    functionName: 'approve',
    args: [parseInt(proposal.proposalId), fees],
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
                color: 'var(--text)'
              }
            }}
            onClick={() => setOpenInfoModal(true)}
          >
            <InfoIcon />
          </IconButton>
          {!onlyRetry && <StyledButton style={{ marginLeft: '12px' }} onClick={() => setOpenApproveModal(true)}>Approve</StyledButton>}
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
      <GlacisModal open={openInfoModal} handleClose={() => setOpenInfoModal(false)} title={'Proposal ' + proposal.proposalId}>
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
              <CardCell>Token Address:</CardCell>
              <CardCell><CardCode>{route?.token}</CardCode></CardCell>
            </CardRow>
            <CardRow>
              <CardCell>Token Amount:</CardCell>
              <CardCell><CardCode>{route?.tokenAmount}</CardCode></CardCell>
            </CardRow>
            <CardRow>
              <CardCell>Calldata:</CardCell>
              <CardCell><CardCode>{route?.calldataPayload}</CardCode></CardCell>
            </CardRow>
          </tbody>
        </CardTable>
      </GlacisModal>
      <GlacisModal open={openApproveModal} handleClose={() => setOpenApproveModal(false)} title={'Approve Proposal ' + proposal.proposalId}>
        {proposal.proposals.map((p, i) => <>
          <div style={{ color: 'white', textAlign: 'center', marginBottom: '1rem', paddingTop: '1rem' }}>
            <b>Message to {CHAINID_TO_NAME[p.toChain]}</b>
          </div>
          <CardTable>
            <tbody>
              {p.gmps.map((gmp, j) =>
                <CardRow key={i + "-" + j}>
                  <CardCell>{GMP_TO_STRING[gmp]} Fees:</CardCell>
                  <CardCell>
                    <NumberInput
                      onChange={handleFeeMenuChange(i, j)}
                      defaultValue={formatEther(fees[i][j])}
                      InputProps={{
                        endAdornment: <InputAdornment sx={{ '.MuiTypography-root': { color: '#CCC' } }} position="end">FTM</InputAdornment>,
                      }}
                    />
                  </CardCell>
                </CardRow>
              )}
            </tbody>
          </CardTable>
        </>)}
        <ButtonContainer style={{ paddingTop: '1rem' }}>
          <StyledButton style={{ marginLeft: '12px' }} onClick={write}>Approve</StyledButton>
        </ButtonContainer>
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
    args: [parseInt(id), index, nonce, [parseEther("1.5")]],
    chainId: fantomTestnet.chainId,
    enabled: true,
    value: parseEther("1.5")
  });

  console.log(`nonce for ${id}:`, nonce)

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

function suggestFees(proposal) {
  let fees = [];
  for (let p of proposal.proposals) {
    let f = [];
    for (let gmp of p.gmps) {
      if (p.toChain === 97) {
        f.push(parseEther('0.8'));
        continue;
      }
      
      f.push(parseEther('0.5'))
    }

    fees.push(f);
  }

  return fees;
}
