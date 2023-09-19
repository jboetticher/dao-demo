import React, { useEffect, useState } from 'react';
import ProposalCard from './components/ProposalCard';
import {
  AppContainer, Header, ProposalList, BigCardContainer, ConnectButton,
  ToggleModeButton, RetriesContainer
} from './StyledComponents';
import ProposalConfig from './components/ProposalConfig';
import DAOCard from './components/DAOCard';

// REDUX
import { useSelector } from 'react-redux';
import { selectProposals } from './slices/proposalSlice';
import { selectDAOs } from './slices/daoSlice';

// WAGMI
import { fantomTestnet } from 'wagmi/chains';
import { useAccount, useConnect, useDisconnect } from 'wagmi';
import DataReader from './components/DataReader';

const App = () => {
  const proposals = useSelector(selectProposals);
  const daos = useSelector(selectDAOs);

  const [retriesEnabled, setRetriesEnabled] = useState(false);

  // console.log('App: proposals from selector:', proposals);

  const { connect, connectors } = useConnect();
  const { disconnect } = useDisconnect();
  const { address, isConnected } = useAccount();

  return (
    <div>
      <DataReader />
      <Header>
        <ToggleModeButton onClick={() => { setRetriesEnabled(!retriesEnabled) }}>
          {retriesEnabled ? 'Proposals' : 'Retries'}
        </ToggleModeButton>
        Glacis DAO Sample
        <ConnectButton
          onClick={() => {
            if (isConnected) disconnect();
            else connect({ connector: connectors[0], chainId: fantomTestnet.id });
          }}
        >
          {isConnected ? 'Disconnect ' + address.substring(0, 5) + '...' : 'Connect'}
        </ConnectButton>
      </Header>
      {retriesEnabled ?
        <AppContainer>
          <RetriesContainer>
            {proposals.filter(p => p.messageIds.length > 0).map((proposal, i) => <ProposalCard onlyRetry={true} key={i} proposal={proposal} />)}
          </RetriesContainer>
        </AppContainer>
        :
        <AppContainer>
          <ProposalList>
            <ProposalConfig />
            {proposals.filter(p => p.messageIds.length == 0).map((proposal, i) => <ProposalCard key={i} proposal={proposal} />)}
          </ProposalList>
          <BigCardContainer>
            {daos.map((card, index) => <DAOCard key={index} {...card} />)}
          </BigCardContainer>
        </AppContainer>
      }
    </div>
  );
};

export default App;
