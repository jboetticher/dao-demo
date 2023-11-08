import React, { useEffect, useState } from 'react';
import ProposalCard from './components/ProposalCard';
import {RetriesContainer} from './StyledComponents';
import ProposalConfig from './components/ProposalConfig';
import DAOCard from './components/DAOCard';

// COMPONENTS
import Background from "./components/Background";
import Header from './components/Header';
import AppGrid from './components/container/AppGrid';
import ProposalList from './components/container/ProposalList';
import BigCardContainer from './components/container/BigCardContainer';

// REDUX
import { useSelector } from 'react-redux';
import { selectProposals } from './slices/proposalSlice';
import { selectDAOs } from './slices/daoSlice';

// WAGMI
import { useAccount, useConnect, useDisconnect } from 'wagmi';
import DataReader from './components/DataReader';
import LoadingAnimation from './components/LoadAnimation';

const App = () => {
  const proposals = useSelector(selectProposals);
  const daos = useSelector(selectDAOs);

  const [retriesEnabled, setRetriesEnabled] = useState(false);

  return (
    <div>
      <DataReader />
      <Background />
      <Header retriesEnabled={retriesEnabled} setRetriesEnabled={setRetriesEnabled} />
      {retriesEnabled ?
        <AppGrid>
          <RetriesContainer>
            {proposals.filter(p => p.messageIds.length > 0).map((proposal, i) => <ProposalCard onlyRetry={true} key={i} proposal={proposal} />)}
          </RetriesContainer>
        </AppGrid>
        :
        <AppGrid>
          <ProposalList>
            <ProposalConfig />
            {proposals.filter(p => p.messageIds.length == 0).map((proposal, i) => <ProposalCard key={i} proposal={proposal} />)}
          </ProposalList>
          <BigCardContainer>
            {daos.map((card, index) => <DAOCard key={index} {...card} />)}
          </BigCardContainer>
        </AppGrid>
      }
      <LoadingAnimation />
    </div>
  );
};

export default App;
