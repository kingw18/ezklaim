
'use server'

import axios from "axios";

// Function to convert the input string into a JSON string
function convertToJSON(inputString: string) {
  // Split the input string into lines
  const lines = inputString.split('\n');

  // Create an object to hold the key-value pairs
  const resultObject: Map<number, string> = new Map();

  // Iterate over each line
  lines.forEach((line, index) => {
    // Extract the key and value using a regular expression
    const match = line.match(/(\w+)\s*=\s*"([^"]+)"/);
    if (match) {
      const key = match[1];
      const value = match[2];

      if (!key || !value) throw new Error("Invalid input string");
      // Add the key-value pair to the object
      resultObject.set(index, value);
    }
  });

  return resultObject
}

const sindriPollProveRequest = async (circuitId: string, proofInput: Object, timeout = 30 * 60 * 1000) => {
        // Make sure to provide your actual API key here.
    const SINDRI_API_KEY = process.env.SINDRI_API_KEY;
    const sindriConfigs = {
      headers: {
        "Authorization": `Bearer ${SINDRI_API_KEY}`
      },
      validateStatus: (status: any) => status >= 200 && status < 300
    }; 


    // Generate a new proof and poll for completion.
    const proveResponse = await axios.post(`https://sindri.app/api/v1/circuit/${circuitId}/prove`, {
      proof_input: Object.entries(proofInput).map(([name, value]) => `${name}=${value}`).join(" \n "),
    }, sindriConfigs);
    
    const proofId = proveResponse.data.proof_id;
    console.log("Proof ID:", proofId);
  
    const startTime = Date.now();
    let proofDetailResponse;
  
    while (true) {
      proofDetailResponse = await axios.get(`https://sindri.app/api/v1/proof/${proofId}/detail`, sindriConfigs);
      const { status } = proofDetailResponse.data;
      const elapsedSeconds = ((Date.now() - startTime) / 1000).toFixed(1);
      if (status === "Ready") {
        console.log(`Polling succeeded after ${elapsedSeconds} seconds.`);
        return {
          proof: proofDetailResponse.data.proof['proof'],
          publicInputs: convertToJSON(proofDetailResponse.data.public['Verifier.toml']),
        }
      } else if (status === "Failed") {
        throw new Error(
          `Polling failed after ${elapsedSeconds} seconds: ${proofDetailResponse.data.error}.`,
        );
      } else if (Date.now() - startTime > timeout) {
        throw new Error("Proof generation timed out.");
      }
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }
  }

export default sindriPollProveRequest;