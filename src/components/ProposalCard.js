import React, { useState } from 'react';
import {
  ProposalCard as StyledProposalCard, StyledButton,
  CardTitle, CardTable, CardRow, CardCell, CardCode
} from '../StyledComponents';
import DropdownButton from "./DropdownButton";

const ProposalCard = ({ proposal }) => {
  const [opened, setOpened] = useState(false);

  // Assume proposal is an object with relevant data
  return (
    <StyledProposalCard>
      <div style={{ display: 'flex', marginBottom: '1rem', alignItems: 'center' }}>
        <CardTitle style={{ width: '100%', marginBottom: 0 }}>Proposal 1</CardTitle>
        <StyledButton>Approve</StyledButton>
        <DropdownButton onClick={() => { setOpened(!opened) }} opened={opened}></DropdownButton>
      </div>
      {opened && (
        <CardTable>
          <CardRow>
            <CardCell>To:</CardCell>
            <CardCell><CardCode>{proposal.to}</CardCode></CardCell>
          </CardRow>
          <CardRow>
            <CardCell>Chain:</CardCell>
            <CardCell><CardCode>{proposal.chain}</CardCode></CardCell>
          </CardRow>
          <CardRow>
            <CardCell>Data:</CardCell>
            <CardCell><CardCode>{proposal.data}</CardCode></CardCell>
          </CardRow>
          <CardRow>
            <CardCell>Glacis Config:</CardCell>
            <CardCell><CardCode>{proposal.glacisConfig}</CardCode></CardCell>
          </CardRow>
        </CardTable>
      )}
    </StyledProposalCard>
  );
};

export default ProposalCard;