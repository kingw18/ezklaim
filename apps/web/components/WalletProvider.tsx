"use client";

import { WagmiProvider, createConfig } from "wagmi";
import { scrollSepolia } from "viem/chains";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ConnectKitProvider, getDefaultConfig } from "connectkit";
import { metaMask } from "@wagmi/connectors";

const config = createConfig(
    getDefaultConfig({
        // Required API Keys
        // alchemyId: process.env.VITE_ALCHEMY_ID, // or infuraId
        walletConnectProjectId: process.env.VITE_WALLETCONNECT_PROJECT_ID ?? "",
        chains: [scrollSepolia],
        connectors: [
            metaMask()
        ],

        // Required
        appName: "ZK Pay",

        // Optional
        appDescription: "Pay like UPI using email and zk",
        appUrl: "https://family.co", // your app's url
        appIcon: "https://family.co/logo.png", // your app's icon, no bigger than 1024x1024px (max. 1MB)
    }),
);


const queryClient = new QueryClient();

export const Web3Provider = ({ children }: any) => {
    return (
        <WagmiProvider config={config}>
            <QueryClientProvider client={queryClient}>
                <ConnectKitProvider>{children}</ConnectKitProvider>
            </QueryClientProvider>
        </WagmiProvider>
    );
};