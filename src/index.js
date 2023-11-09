import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';

import './index.css';
import App from './App';
import { store } from './store';

// WAGMI
import { WagmiConfig, createConfig, configureChains } from 'wagmi';
import { publicProvider } from 'wagmi/providers/public';
import { bscTestnet, avalancheFuji, moonbaseAlpha } from 'wagmi/chains';


const { chains, publicClient, webSocketPublicClient } = configureChains(
  [moonbaseAlpha, bscTestnet, avalancheFuji],
  [publicProvider()]
);
const wagmiConfig = createConfig({
  autoConnect: false,
  publicClient,
  webSocketPublicClient,
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <WagmiConfig config={wagmiConfig}>
      <Provider store={store}>
        <App />
      </Provider>
    </WagmiConfig>
  </React.StrictMode>
);
