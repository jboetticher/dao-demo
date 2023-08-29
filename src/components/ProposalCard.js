import React, { useState } from 'react';
import {
  ProposalCard as StyledProposalCard, StyledButton,
  CardTitle, CardTable, CardRow, CardCell, CardCode,
  TableHeader, ExpandableSection
} from '../StyledComponents';
import DropdownButton from "./DropdownButton";

const ProposalCard = ({ proposal }) => {
  const [opened, setOpened] = useState(false);

  console.log('proposal:', proposal)

  // Assume proposal is an object with relevant data
  return (
    <StyledProposalCard>
      <div style={{ display: 'flex', marginBottom: '1rem', alignItems: 'center' }}>
        <CardTitle style={{ width: '100%', marginBottom: 0 }}>Proposal {proposal.proposalId}</CardTitle>
        <StyledButton>Approve</StyledButton>
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