import React, { useEffect, useState } from 'react';
import {
  ProposalCard as StyledProposalCard, StyledButton,
  CardTitle, CardTable, CardRow, CardCell, CardCode,
  TableHeader, ExpandableSection
} from '../StyledComponents';
import DropdownButton from "./DropdownButton";
import { useContractWrite, usePrepareContractWrite } from 'wagmi';
import { fantomTestnet } from 'wagmi/chains';
import { parseEther } from 'viem';
import { DAO_ADDRESS } from '../constants';
import GlacisSampleDAOABI from '../abi/GlacisSampleDAO';

const GMP_TO_STRING = { 
  1: "Axelar", 
  2: "LayerZero", 
  3: "Wormhole", 
  4: "Hyperlane"
};
const CHAINID_TO_NAME = {
  4002: "Fantom TestNet",
  1287: "Moonbase Alpha",
  43113: "Avalanche Fuji"
};

const ProposalCard = ({ proposal }) => {
  const [opened, setOpened] = useState(false);

  const value = (() => {
    let v;
    if (proposal == null || proposal.proposals == null || proposal.proposals.length == 0) v = parseEther("0.5");
    else v = parseEther((0.5 * proposal.proposals.length * proposal.proposals[0].gmps.length).toString());
    return v;
  })();
  const { config, error } = usePrepareContractWrite({
    address: DAO_ADDRESS, // TODO: fetch from slice (hardcoded fantom)
    abi: GlacisSampleDAOABI,
    functionName: 'approve',
    args: [parseInt(proposal.proposalId)],
    chainId: fantomTestnet.chainId,
    enabled: true,
    value
  });
  
  if(error) console.log(`Error for approve of proposal ${proposal.proposalId}, usePrepareContractWrite error:`, error);

  const { write, error: writeErr, isSuccess, data: writeResult } = useContractWrite(config);

  useEffect(() => {
    if(isSuccess !== true) return;
    
    for(let toChain of proposal.proposals) {
      for(let gmp of toChain.gmps) {
        if(gmp === 1) {
          window.open(`https://testnet.axelarscan.io/gmp/${writeResult.hash}`, '_blank');
        }
        else if (gmp === 2) {
          window.open(`https://testnet.layerzeroscan.com/`, '_blank');
        }
      }
    }
  }, [isSuccess]);

  // Assume proposal is an object with relevant data
  return (
    <StyledProposalCard>
      <div style={{ display: 'flex', marginBottom: '1rem', alignItems: 'center' }}>
        <CardTitle style={{ width: '100%', marginBottom: 0 }}>Proposal {proposal.proposalId}</CardTitle>
        <StyledButton onClick={write}>Approve</StyledButton>
        <DropdownButton onClick={() => { setOpened(!opened) }} opened={opened}></DropdownButton>
      </div>
      <ExpandableSection opened={opened}>
        {/* TODO: add messageIds displays */}
        {proposal.proposals.map((p, i) => (
          <>
            <TableHeader>
              Cross-Chain Message {i + 1} (to {CHAINID_TO_NAME[p.toChain]})
            </TableHeader>
            <CardTable>
              <CardRow>
                <CardCell>To:</CardCell>
                <CardCell><CardCode>{p.to}</CardCode></CardCell>
              </CardRow>
              <CardRow>
                <CardCell>Data:</CardCell>
                <CardCell><CardCode>{p.payload}</CardCode></CardCell>
              </CardRow>
              <CardRow>
                <CardCell>GMPs:</CardCell>
                <CardCell>
                  <CardCode>
                    {p.gmps.map(gmpID => GMP_TO_STRING[gmpID]).join(', ')}
                  </CardCode>
                </CardCell>
              </CardRow>
              <CardRow>
                <CardCell>Quorum:</CardCell>
                <CardCell><CardCode>{p.quorum}</CardCode></CardCell>
              </CardRow>
            </CardTable>
          </>
        ))}
      </ExpandableSection>
    </StyledProposalCard>
  );
};

export default ProposalCard;