import { Button, Input } from "@nextui-org/react";

import { useEffect, useState } from "react";
import { BarretenbergBackend, ProofData } from '@noir-lang/backend_barretenberg';
import { Noir } from '@noir-lang/noir_js';
import circuit from "@repo/circuits/target/ezklaim_circuit.json";
import { generateProof } from "../app/api/prove";
import { useUser } from '@auth0/nextjs-auth0/client';
import { getAccessToken } from '@auth0/nextjs-auth0';
import { Address } from "viem";

export default function ReceiveFunds({ handleClaimFunds }: { handleClaimFunds: (address: Address, email: string, proof: Uint8Array) => void }) {
  const [activeTab, setActiveTab] = useState('proof');
  const [destinationAddress, setDestinationAddress] = useState('');
  const [email, setEmail] = useState('');

  function submitProof() {
    // TODO: generate proof
    setIsGeneratingProof(true);
    getAccessToken().then((accessToken) => {
      console.log(accessToken);
    });
    generateProof({ x: 5, y: 7 }).then(({ proof, publicInputs }) => {
      setProof({
        proof,
        publicInputs
      });
      alert("Proof generated!");
    }).finally(() => {
      setIsGeneratingProof(false)
      setActiveTab('claim');
    })
  }

  function claimFund() {
    // TODO: claim fund

    if (!proof) submitProof();
    handleClaimFunds(destinationAddress, email, proof!.proof);
    alert("Not implemented yet");
  }

  const { user, error, isLoading } = useUser();

  const getUserAccessToken = async () => {
    const { accessToken } = await getAccessToken();
    return accessToken;
  }

  const [noir, setNoir] = useState<Noir | null>(null);
  const [proof, setProof] = useState<ProofData | null>(null);
  const [isGeneratingProof, setIsGeneratingProof] = useState(false);

  useEffect(() => {
    const backend = new BarretenbergBackend(circuit as any);
    const noir = new Noir(circuit as any, backend);
    setNoir(noir);
  }, []);


  return (
    <div className="h-full" >
      {activeTab == 'proof' ?
        (
          <div className="pt-10 pl-4 pr-4 pb-10 h-full flex flex-col justify-between">
            <Input value={destinationAddress} onChange={(e: any) => setDestinationAddress(e.target.value)} type="string" label="Destination Address" placeholder="Enter destination wallet address" />
            <Input value={email} onChange={(e: any) => setEmail(e.target.value)} type="email" label="Email" placeholder="Enter Your email" />
            <div className=" w-full flex justify-center">
              <Button
                onClick={submitProof}
                className="w-1/2" >{isGeneratingProof ? "Generating Proof..." : "Generate Proof"}</Button>
            </div>
          </div>
        ) : (
          <div className="pt-10 pl-4 pr-4 pb-10 flex flex-col h-full justify-between">

            Proof Generated!!
            <div className=" w-full flex justify-center items-end">
              <Button
                onClick={claimFund}
                className="w-1/2" >Claim Fund</Button>
            </div>
          </div>
        )
      }
    </div>
  );
}