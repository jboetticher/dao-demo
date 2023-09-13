import React, { useState } from 'react';
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

const ProposalCard = ({ proposal }) => {
  const [opened, setOpened] = useState(false);

  const value = (() => { 
    let v;
    if(proposal == null || proposal.gmps == null || proposal.gmps.length == 0) v = parseEther("0.5");
    else v = parseEther((0.5 * proposal.gmps.length * proposal.proposals.length).toString());
    return v;
  })();

  const { config, error } = usePrepareContractWrite({
    address: DAO_ADDRESS, // TODO: fetch from slice (hardcoded fantom)
    abi: GlacisSampleDAOABI,
    functionName: 'approve',
    args: [2],//parseInt(proposal.proposalId)],
    chainId: fantomTestnet.chainId,
    enabled: true,
    value 
  });
  console.log(`For proposal ${proposal.proposalId}`, error);

  const { write, error: writeErr } = useContractWrite(config);

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
            <TableHeader>Cross-Chain Message {i + 1}</TableHeader>
            <CardTable>
              <CardRow>
                <CardCell>To:</CardCell>
                <CardCell><CardCode>{p.to}</CardCode></CardCell>
              </CardRow>
              <CardRow>
                <CardCell>Chain:</CardCell>
                <CardCell><CardCode>{p.toChain}</CardCode></CardCell>
              </CardRow>
              <CardRow>
                <CardCell>Data:</CardCell>
                <CardCell><CardCode>{p.payload}</CardCode></CardCell>
              </CardRow>
              <CardRow>
                <CardCell>GMPs:</CardCell>
                <CardCell><CardCode>{p.gmps.reduce((prev, cur) => prev + ',' + cur)}</CardCode></CardCell>
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