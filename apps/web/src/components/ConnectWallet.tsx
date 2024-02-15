import {
    useConnect,
    // import the wallet you want to connect
    metamaskWallet,
} from "@thirdweb-dev/react";

const walletConfig = metamaskWallet();

export default function ConnectWallet() {
    const connect = useConnect();

    async function handleConnect() {
        try {
            const wallet = await connect(
                walletConfig, // pass the wallet config object
                // connectOptions, // pass options required by the wallet (if any)
            );

            console.log("connected to", wallet);
        } catch (e) {
            console.error("failed to connect", e);
        }
    }

    return <button onClick={handleConnect}> connect wallet </button>;
}
