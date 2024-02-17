"use client";

import { useEffect, useState } from "react";
import { BarretenbergBackend, ProofData } from '@noir-lang/backend_barretenberg';
import { Noir } from '@noir-lang/noir_js';
import circuit from "@repo/circuits/target/ezklaim_circuit.json";
import { generateProof } from "../app/api/prove";
import { useUser } from '@auth0/nextjs-auth0/client';
import { getAccessToken } from '@auth0/nextjs-auth0';

export default function NoirComponent() {

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

    
    // const verifyProof = async (proof: ProofData) => {
    //     try {
    //         console.log(proof.publicInputs);
    //         const result = await noir!.verifyFinalProof(proof);
    //         alert("Proof verified!");
    //         return result;
    //     } catch (e) {
    //         console.error(e);
    //     }
    // }

    if (!noir) {
        return null;
    }
    
    return (
        <div>
        <h1>ezkclaim</h1>
        <button onClick={() => {
            setIsGeneratingProof(true);
            getAccessToken().then((accessToken) => {
                console.log(accessToken);
            });
            generateProof({x:5, y: 7}).then(({ proof, publicInputs }) => {
                setProof({
                    proof, 
                    publicInputs
                });
                alert("Proof generated!");
            }).finally(() => setIsGeneratingProof(false))
        }}>{
            isGeneratingProof ? "Generating Proof..." : "Generate Proof"
        
        }</button>
        <button onClick={() => {
            alert("Not implemented yet");
    }}>Verify Proof</button>
        </div>
    );
}