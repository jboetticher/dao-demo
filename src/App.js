import React from 'react';
import ProposalCard from './components/ProposalCard';
import { 
  AppContainer, Header, ProposalList, BigCardContainer, BigCard
} from './StyledComponents';
import ProposalConfig from './components/ProposalConfig';
import DAOCard from './components/DAOCard';
import { createConfig, configureChains } from '@wagmi/core';
import { fantomTestnet, avalancheFuji, moonbaseAlpha } from '@wagmi/core/chains';
import { publicProvider } from 'wagmi/providers/public';
import { useSelector, useDispatch } from 'react-redux';
import { selectProposals } from './slices/proposalSlice';
import { selectDAOs } from './slices/daoSlice';

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [fantomTestnet, avalancheFuji, moonbaseAlpha],
  [publicProvider(fantomTestnet), publicProvider(avalancheFuji), publicProvider(moonbaseAlpha)],
)
 
const config = createConfig({
  chains,
  publicClient,
  webSocketPublicClient
})

const App = () => {
  const proposals = useSelector(selectProposals);
  const daos = useSelector(selectDAOs);

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
