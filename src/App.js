import React from 'react';
import ProposalCard from './ProposalCard';
import { 
  AppContainer, Header, ProposalList, BigCardContainer, BigCard
} from './StyledComponents';
import ProposalConfig from './components/ProposalConfig';
import DAOCard from './components/DAOCard';
import { createConfig, configureChains } from '@wagmi/core';
import { fantomTestnet, avalancheFuji, moonbaseAlpha } from '@wagmi/core/chains';
import { publicProvider } from 'wagmi/providers/public';

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
  const proposals = [
    0, 0, 
  ];

  const daoCards = [
    {
      chain: fantomTestnet,
      address: '0x8e36A1307C992b444de26286f2858071a247A357'
    }
  ];

  return (
    <div>
      <Header>Glacis DAO Sample</Header>

      <AppContainer>
        <ProposalList>
          <ProposalConfig />
          {proposals.map((proposal, i) => <ProposalCard key={i} proposal={proposal} />)}
        </ProposalList>

        <BigCardContainer>
          {daoCards.map((card, index) => <DAOCard key={index} {...card} />)}
        </BigCardContainer>
      </AppContainer>
    </div>
  );
};

export default App;
