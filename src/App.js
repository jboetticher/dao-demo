import React, { useEffect } from 'react';
import ProposalCard from './components/ProposalCard';
import {
  AppContainer, Header, ProposalList, BigCardContainer, ConnectButton
} from './StyledComponents';
import ProposalConfig from './components/ProposalConfig';
import DAOCard from './components/DAOCard';
import { FANTOM_DAO_ADDRESS } from './constants';

// REDUX
import { useSelector, useDispatch } from 'react-redux';
import { selectProposals } from './slices/proposalSlice';
import { selectDAOs, fetchDAOData } from './slices/daoSlice';
import { fetchProposalData } from './slices/proposalSlice';

// WAGMI
import { fantomTestnet, avalancheFuji, moonbaseAlpha } from 'wagmi/chains';
import { useAccount, useConnect, useDisconnect } from 'wagmi';

// Remember to update in daoSlice.js
// TODO: fetch from slice
const daoAddresses = {
  [fantomTestnet.id]: FANTOM_DAO_ADDRESS,
  [moonbaseAlpha.id]: '0x0F3C8d93857Cc55499e3eE8bAA0a20488D1888C7',
};

const App = () => {
  const dispatch = useDispatch();
  const proposals = useSelector(selectProposals);
  const daos = useSelector(selectDAOs);

  console.log('proposals after selector:', proposals);

  useEffect(() => {
    dispatch(fetchDAOData(daoAddresses));
    dispatch(fetchProposalData());
  }, []);

  const { connect, connectors } = useConnect();
  const { disconnect } = useDisconnect();
  const { address, isConnected } = useAccount();

  return (
    <div>
      <Header>
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
