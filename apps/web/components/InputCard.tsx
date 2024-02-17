import { Card, CardBody, CardHeader } from "@nextui-org/react";
import { useState } from "react";
import SendFunds from "./SendFunds";
import ReceiveFunds from "./ReceiveFunds";
import { createWalletClient, custom, sha256, toHex, parseEther } from "viem";
import { scrollSepolia } from "viem/chains";
import { ezklaimabi } from "../abis/EzklaimAbi";

declare var window: any;

export default function InputCard() {
  const [activeTab, setActiveTab] = useState('send');
  const getWalletClient = async () => {
    if (!window.ethereum) {
      throw new Error("No ethereum provider found");
    }
    const client = createWalletClient({
      chain: scrollSepolia,
      transport: custom(window.ethereum),
    });
    console.log(client);
    const [address] = await client.requestAddresses();
    console.log("address", address);
    const realClient = createWalletClient({
      account: address!,
      chain: scrollSepolia,
      transport: custom(window.ethereum),
    });
    console.log(realClient);
    return realClient;
  };

  const handleSendFunds = async (email: string, amount: string) => {
    const client = await getWalletClient();
    try {
      const hash = await client.writeContract({
        abi: ezklaimabi,
        address: "0x85890311c6028fca301068638be3c68675b88c51",
        functionName: "deposit",
        args: [sha256(toHex(email))],
        value: parseEther(amount),
        chain: scrollSepolia,
        account: client.account?.address!,
      });
      console.log(hash);
    } catch (e) {
      console.error(e);
    }
  };

  const handleClaimFunds = async (address: string, email: string, proof: Uint8Array) => {
    const client = await getWalletClient();
    try {
      const hash = await client.writeContract({
        abi: ezklaimabi,
        address: "0x85890311c6028fca301068638be3c68675b88c51",
        functionName: "claim",
        args: [proof, sha256(toHex(email)), address],
        chain: scrollSepolia,
        account: client.account?.address!,
      });
      console.log(hash);
    } catch (e) {
      console.error(e);
    }
  }
    return (
      <div>
        <Card className="w-[500px] h-[450px] bg-zinc-800" >
          <CardHeader className="flex gap-3 mt-3">
            <div
              onClick={() => setActiveTab('send')}
              className={`w-1/2 flex justify-center cursor-pointer ${activeTab === 'send' ? 'border-b-4 border-blue-500' : ''}`}
            >
              <p className="text-xl text-white font-inter">Send Funds</p>
            </div>
            <div
              onClick={() => setActiveTab('receive')}
              className={`w-1/2 flex text-white justify-center cursor-pointer ${activeTab === 'receive' ? 'border-b-4 border-blue-500' : ''}`}
            >
              <p className="text-xl font-inter">Receive Funds</p>
            </div>
          </CardHeader>
          <CardBody >
            {activeTab == 'send' ? <SendFunds handleSendFunds={handleSendFunds} /> : <ReceiveFunds handleClaimFunds={handleClaimFunds} />}
          </CardBody>
        </Card>
      </div>
    );
  }
