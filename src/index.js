import React from "react";
import ReactDOM from "react-dom/client";
import { PersistGate } from "redux-persist/integration/react";
import "slick-carousel/slick/slick.css";
import { Provider } from "react-redux";
import { store, persistor } from "./redux/store";
import "./index.css";
 import App from "./App";
import { WagmiProvider } from "wagmi";
import {
  mainnet,
  polygon,
  syscoin,
  syscoinTestnet, rollux
} from 'wagmi/chains';
import { darkTheme, getDefaultConfig, lightTheme, RainbowKitProvider, Theme } from '@rainbow-me/rainbowkit';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
 
 
const config = getDefaultConfig({
  appName: 'Decent Shop',
  projectId: 'YOUR_PROJECT_ID',
  chains: [ 
    syscoin,
    rollux,
    ...(process.env.NEXT_PUBLIC_ENABLE_TESTNETS === 'false' ? [syscoinTestnet] : []),
  ],
  ssr: true,
});

const client = new QueryClient();


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(

  <WagmiProvider config={config}>
    <QueryClientProvider client={client}>
       <RainbowKitProvider initialChain={rollux} >
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <App />
          </PersistGate>
        </Provider>
      </RainbowKitProvider>
    </QueryClientProvider>

  </WagmiProvider>
);
