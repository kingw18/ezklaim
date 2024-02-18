import { WagmiProvider, createConfig, http } from "wagmi";
import { arbitrum, arbitrumSepolia, mainnet, sepolia } from "wagmi/chains";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ConnectKitProvider, getDefaultConfig } from "connectkit";


const config = createConfig(
    getDefaultConfig({
        // Required API Keys
        // alchemyId: import.meta.env.VITE_ALCHEMY_ID, // or infuraId
        walletConnectProjectId: import.meta.env.VITE_WALLETCONNECT_PROJECT_ID,
        chains: [sepolia, arbitrumSepolia, mainnet, arbitrum],
        transports: {
            // RPC URL for each chain
            [mainnet.id]: http(
                `https://eth-mainnet.g.alchemy.com/v2/${import.meta.env.VITE_ALCHEMY_ID}`,
            ),
            [sepolia.id]: http(
                `https://eth-sepolia.g.alchemy.com/v2/${import.meta.env.VITE_ALCHEMY_ID}`,
            ),
            [arbitrumSepolia.id]: http(
                `https://arb-sepolia.g.alchemy.com/v2/${import.meta.env.VITE_ALCHEMY_ID}`,
            ),
            [arbitrum.id]: http(
                `https://arb-mainnet.g.alchemy.com/v2/${import.meta.env.VITE_ALCHEMY_ID}`,
            ),
        },

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