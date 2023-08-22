import React, { useEffect } from 'react';
import ProposalCard from './components/ProposalCard';
import {
  AppContainer, Header, ProposalList, BigCardContainer, BigCard
} from './StyledComponents';
import ProposalConfig from './components/ProposalConfig';
import DAOCard from './components/DAOCard';

// REDUX
import { useSelector, useDispatch } from 'react-redux';
import { selectProposals } from './slices/proposalSlice';
import { selectDAOs, fetchDAOData } from './slices/daoSlice';

// WAGMI
import { fantomTestnet, avalancheFuji, moonbaseAlpha } from 'wagmi/chains';

// Remember to update in daoSlice.js
const daoAddresses = {
  [moonbaseAlpha.id]: '0x0F3C8d93857Cc55499e3eE8bAA0a20488D1888C7',
  [fantomTestnet.id]: '0x9d7cC383E2da8644D0752800EB5D20FEEBa94e69',
};

const App = () => {
  const dispatch = useDispatch();
  const proposals = useSelector(selectProposals);
  const daos = useSelector(selectDAOs);

  useEffect(() => {
    dispatch(fetchDAOData(daoAddresses));
  }, []);

  console.log('DAOS:', daos)

  return (
    <div>
      <Header>Glacis DAO Sample</Header>
      <AppContainer>
        <ProposalList>
          <ProposalConfig />
          {proposals.map((proposal, i) => <ProposalCard key={i} proposal={proposal} />)}
        </ProposalList>

        <BigCardContainer>
          {daos.map((card, index) => <DAOCard key={index} {...card} />)}
        </BigCardContainer>
      </AppContainer>
    </div>
  );
};

export default App;
