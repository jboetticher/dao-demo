import React from 'react';
import ProposalCard from './ProposalCard';
import { 
  AppContainer, Header, ProposalList, BigCardContainer, 
  BigCard, CardTitle, ButtonContainer, StyledButton
} from './StyledComponents';

const App = () => {
  const proposals = [
    0, 0, 0, 0, 0, 0, 0
  ];

  const bigCards = [
    0, 0
  ];

  return (
    <div>
      <Header>Glacis DAO Sample</Header>

      <AppContainer>
        <ProposalList>
          <BigCard>
            <CardTitle>Create Proposals</CardTitle>
            <ButtonContainer>
              <StyledButton>Fantom</StyledButton>
              <StyledButton>Avalanche</StyledButton>
              <StyledButton>Both</StyledButton>
            </ButtonContainer>
          </BigCard>
          {proposals.map((proposal, i) => <ProposalCard key={i} proposal={proposal} />)}
        </ProposalList>

        <BigCardContainer>
          {bigCards.map((card, index) => <BigCard key={index}>{card.content}</BigCard>)}
        </BigCardContainer>
      </AppContainer>
    </div>
  );
};

export default App;
