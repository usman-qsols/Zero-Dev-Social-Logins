// import React from "react";
// import ReactDOM from "react-dom/client";
// import "./index.css";
// import App from "./App";
// import reportWebVitals from "./reportWebVitals";
// import { WagmiConfig } from "wagmi";
// import { mainnet, polygon, optimism, arbitrum } from "wagmi/chains";
// import { ConnectKitProvider } from "connectkit";
// import {
//   SocialWalletConnector,
//   GoogleSocialWalletConnector,
//   FacebookSocialWalletConnector,
//   GithubSocialWalletConnector,
//   DiscordSocialWalletConnector,
//   TwitchSocialWalletConnector,
//   TwitterSocialWalletConnector,
// } from "@zerodev/wagmi";

// import { createConfig } from "wagmi";
// import { polygonMumbai } from "wagmi/chains";
// import { getDefaultConfig } from "connectkit";

// // function ConnectKitExample() {
// const projectId = "aec66fa3-9e4f-4d6a-a5a8-7172d367b286";
// const chains = [polygonMumbai];
// const options = {
//   chains,
//   options: { projectId: projectId },
// };

// const config = createConfig(
//   getDefaultConfig({
//     chains,
//     connectors: [
//       new GoogleSocialWalletConnector(options),
//       new FacebookSocialWalletConnector(options),
//       new GithubSocialWalletConnector(options),
//       new DiscordSocialWalletConnector(options),
//       new TwitchSocialWalletConnector(options),
//       new TwitterSocialWalletConnector(options),
//       // new InjectedConnector(),
//     ],
//     autoConnect: false,
//   })
// );
// // }

// const root = ReactDOM.createRoot(document.getElementById("root"));
// root.render(
//   <React.StrictMode>
//     <WagmiConfig config={config}>
//       <ConnectKitProvider debugMode>
//         <App />
//       </ConnectKitProvider>
//     </WagmiConfig>
//   </React.StrictMode>
// );

// // If you want to start measuring performance in your app, pass a function
// // to log results (for example: reportWebVitals(console.log))
// // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();

import React from "react";
import "@rainbow-me/rainbowkit/styles.css";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { WagmiConfig } from "wagmi";
import { mainnet, polygon, optimism, arbitrum } from "wagmi/chains";
import { ConnectKitProvider } from "connectkit";
import { infuraProvider } from "wagmi/providers/infura";
import {
  connectorsForWallets,
  RainbowKitProvider,
  darkTheme,
} from "@rainbow-me/rainbowkit";
import {
  googleWallet,
  facebookWallet,
  githubWallet,
  discordWallet,
  twitchWallet,
  twitterWallet,
} from "@zerodev/wagmi/rainbowkit";

import { createConfig } from "wagmi";
import { polygonMumbai } from "wagmi/chains";
import { getDefaultConfig } from "connectkit";
import { configureChains } from "wagmi";

// function ConnectKitExample() {
const allowedChains = [polygonMumbai];
export const projectId = "b5486fa4-e3d9-450b-8428-646e757c10f6";

export const { chains, publicClient, webSocketPublicClient } = configureChains(
  [polygonMumbai],
  [infuraProvider({ apiKey: "f36f7f706a58477884ce6fe89165666c" })]
);

const connectors = connectorsForWallets([
  {
    groupName: "Social",
    wallets: [
      googleWallet({
        chains: allowedChains,
        options: { projectId: projectId },
      }),
      facebookWallet({
        chains: allowedChains,
        options: { projectId: projectId },
      }),
      githubWallet({
        chains: allowedChains,
        options: { projectId: projectId },
      }),
      discordWallet({
        chains: allowedChains,
        options: { projectId: projectId },
      }),
      twitchWallet({
        chains: allowedChains,
        options: { projectId: projectId },
      }),
      twitterWallet({
        chains: allowedChains,
        options: { projectId: projectId },
      }),
    ],
  },
]);

// const { chains, publicClient, webSocketPublicClient } = configureChains(
//   allowedChains,
//   [infuraProvider({ apiKey: infuraApiKey })]
// );
const config = createConfig({
  autoConnect: false,
  connectors,
  publicClient,
  webSocketPublicClient,
});

// }

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <WagmiConfig config={config}>
      <RainbowKitProvider
        theme={darkTheme()}
        chains={chains}
        modalSize="compact"
      >
        <App />
      </RainbowKitProvider>
    </WagmiConfig>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
