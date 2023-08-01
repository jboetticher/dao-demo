import React from 'react';
import { ProposalCard as StyledProposalCard } from './StyledComponents';
import { CardTitle } from './StyledComponents';


const ProposalCard = ({ proposal }) => {
  // Assume proposal is an object with relevant data
  return (
    <StyledProposalCard>
      <CardTitle>Proposal</CardTitle>
      <div>This is a proposal card</div>
      <div>This is a proposal card</div>
    </StyledProposalCard>
  );
};

export default ProposalCard;