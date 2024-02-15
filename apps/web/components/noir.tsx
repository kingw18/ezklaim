"use client";

import { useEffect, useState } from "react";
import { BarretenbergBackend, ProofData } from '@noir-lang/backend_barretenberg';
import { Noir } from '@noir-lang/noir_js';
import circuit from "@repo/circuits/target/noirstarter.json";
import { generateProof } from "../app/api/prove";

export default function NoirComponent() {
    

    const [noir, setNoir] = useState<Noir | null>(null);
    const [proof, setProof] = useState<ProofData | null>(null);
    const [isGeneratingProof, setIsGeneratingProof] = useState(false);
    
    useEffect(() => {
        const backend = new BarretenbergBackend(circuit as any);
        const noir = new Noir(circuit as any, backend);
        setNoir(noir);
    }, []);

    const generateProofNoir = async (input: any) => {
        // try {
            setIsGeneratingProof(true);
            const proof = await noir!.generateFinalProof(input);
            setIsGeneratingProof(false);
            alert("Proof generated!"); 

            console.log(proof);
            const result = await generateProof(input);
            console.log(result);
        setProof(proof);
        // } catch (e) {
        //     console.error(e);
        // }
    }
    

    const verifyProof = async (proof: ProofData) => {
        try {
            console.log(proof.publicInputs);
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
        <button onClick={() => {
            generateProofNoir({x:4, y:5, z:6});
            // setIsGeneratingProof(true);
            // generateProof({x:5, y: 7}).then(({ proof, publicInputs }) => {
            //     setProof({
            //         proof, 
            //         publicInputs
            //     });
            //     alert("Proof generated!");
            // }).finally(() => setIsGeneratingProof(false))
        }}>{
            isGeneratingProof ? "Generating Proof..." : "Generate Proof"
        
        }</button>
        <button onClick={() => {
            console.log(proof);
            proof ? verifyProof(proof): null
        }}>Verify Proof</button>
        </div>
    );
}