"use client";

import { useState } from "react";
import { createWalletClient, custom, WalletClient, keccak256, toHex, parseEther } from "viem";
import { scrollSepolia } from "viem/chains";
import { ezklaimabi } from "../abis/EzklaimAbi";
declare var window: any

export default function ConnectWalletComponent() {
  const [client, setClient] = useState<WalletClient | null>(null);
  const [value, setValue] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [destAddr, setDestAddr] = useState<string>("");

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

  const deposit = async () => {
    if (!client) {
      throw new Error("No client found");
    }
    // Write deposit code
    console.log("Depositing", value, email);
    try {
      const hash = await client.writeContract({
        abi: ezklaimabi,
        address: "0x85890311c6028fca301068638be3c68675b88c51",
        functionName: "deposit",
        args: [keccak256(toHex(email))],
        value: parseEther(value!),
        chain: scrollSepolia,
        account: client.account?.address!,
      });
    } catch (e) {
      console.error(e);
    }
  };

  const claim = async () => {
    if (!client) {
      throw new Error("No client found");
    }
    // Write claim code
    console.log("Claiming");
    const hash = await client.writeContract({
      abi: ezklaimabi,
      address: "0x85890311c6028fca301068638be3c68675b88c51",
      functionName: "claim",
      args: [keccak256(toHex(email)), client.account?.address!],
      chain: scrollSepolia,
      account: client.account?.address!,
    });
    console.log("hash", hash);
  }

  const deploy = async () => {
    if (!client) {
      throw new Error("No client found");
    }
    // Write deploy code
    console.log("Deploying");
    if (!client.chain) {
      throw new Error("No chain found");
    }
    const hash = await client.deployContract({
      abi: ezklaimabi,
      bytecode: "0x608060405234801561000f575f80fd5b506104f38061001d5f395ff3fe608060405260043610610033575f3560e01c806349ea6e7d14610037578063b214faa514610058578063e5e8393b1461007e575b5f80fd5b348015610042575f80fd5b50610056610051366004610340565b6100b4565b005b61006b6100663660046103cf565b6102bc565b6040519081526020015b60405180910390f35b348015610089575f80fd5b505f5461009c906001600160a01b031681565b6040516001600160a01b039091168152602001610075565b5f82815260016020526040902054806101145760405162461bcd60e51b815260206004820152601d60248201527f4e6f2062616c616e636520617661696c61626c6520746f20636c61696d00000060448201526064015b60405180910390fd5b6040805160018082528183019092525f916020808301908036833701905050905083815f81518110610148576101486103e6565b60209081029190910101525f54604051633a94343960e21b81526001600160a01b039091169063ea50d0e490610186908990899086906004016103fa565b602060405180830381865afa1580156101a1573d5f803e3d5ffd5b505050506040513d601f19601f820116820180604052508101906101c59190610472565b6102115760405162461bcd60e51b815260206004820152601960248201527f50726f6f6620766572696669636174696f6e206661696c656400000000000000604482015260640161010b565b5f84815260016020526040808220829055516001600160a01b0385169084908381818185875af1925050503d805f8114610266576040519150601f19603f3d011682016040523d82523d5f602084013e61026b565b606091505b50509050806102b35760405162461bcd60e51b81526020600482015260146024820152732330b4b632b2103a379039b2b7321022ba3432b960611b604482015260640161010b565b50505050505050565b5f8034116103185760405162461bcd60e51b8152602060048201526024808201527f4465706f7369742076616c7565206d75737420626520677265617465722074686044820152630616e20360e41b606482015260840161010b565b5f8281526001602052604081208054349290610335908490610498565b909155509192915050565b5f805f8060608587031215610353575f80fd5b843567ffffffffffffffff8082111561036a575f80fd5b818701915087601f83011261037d575f80fd5b81358181111561038b575f80fd5b88602082850101111561039c575f80fd5b60209283019650945050850135915060408501356001600160a01b03811681146103c4575f80fd5b939692955090935050565b5f602082840312156103df575f80fd5b5035919050565b634e487b7160e01b5f52603260045260245ffd5b60408152826040820152828460608301375f606084830101525f601f19601f850116820160608101602060608584030160208601528186518084526080850191506020880194505f93505b808410156104655784518252938201936001939093019290820190610445565b5098975050505050505050565b5f60208284031215610482575f80fd5b81518015158114610491575f80fd5b9392505050565b808201808211156104b757634e487b7160e01b5f52601160045260245ffd5b9291505056fea2646970667358221220a4b6ab17b86bdd620eef78e79c44344f9e94daffedf1f74ce7add609b7b6f5e464736f6c63430008180033",
      account: client.account?.address!,
      chain: client.chain!,
    });
    console.log("hash", hash);
  }

  const handleValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    if (/^\d*\.?\d*$/.test(inputValue)) {
      setValue(inputValue);
    }
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const isValidEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };
  const handleDestAddrChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDestAddr(event.target.value);
  };

  const isValidEthereumAddress = (address: string) => {
    // Regular expression for Ethereum address validation
    return /^(0x)?[0-9a-fA-F]{40}$/.test(address);
  };

  return (
    <div>
      <div>
        <button
          onClick={async () => {
            const walletClient = await getWalletClient();
            console.log(walletClient);
            if (walletClient) setClient(walletClient);
          }}
        >
          {client?.account ? client.account.address : "Connect Wallet"}
        </button>
      </div>
      <div>
        <div>
          <input
            type="text"
            value={value}
            onChange={handleValueChange}
            placeholder="Enter value"
          />
          <div>
            <input
              type="email"
              value={email}
              onChange={handleEmailChange}
              placeholder="Enter email"
              style={{ width: "100%" }}
            />
            {!isValidEmail(email) && (
              <p style={{ color: 'red' }}>Please enter a valid email address</p>
            )}
          </div>
        </div>
        <button onClick={deposit} disabled={!client?.account || !value || !email || !isValidEmail(email)}>
          Deposit
        </button>
      </div>

      <div>
        <div>
          <input
            type="text"
            value={destAddr}
            onChange={handleDestAddrChange}
            placeholder="Enter Ethereum address"
          />
          {!isValidEthereumAddress(destAddr) && (
            <p style={{ color: 'red' }}>Please enter a valid Ethereum address</p>
          )}
        </div>
        <button onClick={claim} disabled={!client?.account || !isValidEthereumAddress(destAddr)}>
          Claim
        </button>
      </div>
    </div>
  );
}