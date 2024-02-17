"use server";

import sindriPollProveRequest from "../../lib/sindri/prove";


export const generateProof = async (input: any) => {
    const { proof, publicInputs } = await sindriPollProveRequest(process.env.CIRCUIT_ID!, input);
    return { proof, publicInputs };
}
