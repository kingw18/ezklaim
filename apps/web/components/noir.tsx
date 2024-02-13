"use client";

import { useEffect, useState } from "react";
import { BarretenbergBackend, ProofData } from '@noir-lang/backend_barretenberg';
import { Noir } from '@noir-lang/noir_js';
import circuit from "@repo/circuits/target/noirstarter.json";

export default function NoirComponent() {

    const [noir, setNoir] = useState<Noir | null>(null);
    const [proof, setProof] = useState<ProofData | null>(null);
    const [isGeneratingProof, setIsGeneratingProof] = useState(false);
    
    useEffect(() => {
        const backend = new BarretenbergBackend(circuit as any);
        const noir = new Noir(circuit as any, backend);
        setNoir(noir);
    }, []);

    const generateProof = async (input: any) => {
        try {
            setIsGeneratingProof(true);
            const proof = await noir!.generateFinalProof(input);
            setIsGeneratingProof(false);
            alert("Proof generated!"); 
        setProof(proof);
        } catch (e) {
            console.error(e);
        }
    }

    const verifyProof = async (proof: ProofData) => {
        try {
            const result = await noir!.verifyFinalProof(proof);
            alert("Proof verified!");
            return result;
        } catch (e) {
            console.error(e);
        }
    }

    if (!noir) {
        return null;
    }
    
    return (
        <div>
        <h1>ezkclaim</h1>
        <button onClick={() => generateProof({x:1, y: 2})}>{
            isGeneratingProof ? "Generating Proof..." : "Generate Proof"
        
        }</button>
        <button onClick={() => verifyProof(proof!)}>Verify Proof</button>
        </div>
    );
}