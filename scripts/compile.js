// // Use dynamic imports for ESM and node REPL compatibility, not necessary otherwise.
// const axios = (await import("axios")).default;
// const FormData = (await import("form-data")).default;
const fs = require("fs");
const path = require("path");
const process = require("process"); 
// const process = (await import("process")).default;
const tar = require("tar");
const axios = require("axios");

const sindriPollProveRequest = async (circuitId, proofInput, timeout = 30 * 60 * 1000) => {
  console.log({
    proof_input: Object.entries(proofInput).map(([name, value]) => `${name}=${value}`).join("\n"),
  });
    // Generate a new proof and poll for completion.
    const proveResponse = await axios.post(`/circuit/${circuitId}/prove`, {
      proof_input: Object.entries(proofInput).map(([name, value]) => `${name}=${value}`).join(" \n "),
    });
    
    const proofId = proveResponse.data.proof_id;
    console.log("Proof ID:", proofId);
  
    const startTime = Date.now();
    let proofDetailResponse;
  
    while (true) {
      proofDetailResponse = await axios.get(`/proof/${proofId}/detail`);
      const { status } = proofDetailResponse.data;
      const elapsedSeconds = ((Date.now() - startTime) / 1000).toFixed(1);
      if (status === "Ready") {
        console.log(`Polling succeeded after ${elapsedSeconds} seconds.`);
        return {
          proof: proofDetailResponse.data.proof,
          output: proofDetailResponse.data.public,
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

(async ()=> {
  // Make sure to provide your actual API key here.
const SINDRI_API_KEY = process.env.SINDRI_API_KEY || "<your-key-here>";

// Use v1 of the Sindri API.
axios.defaults.baseURL = "https://sindri.app/api/v1";
// Authorize all future requests with an `Authorization` header.
axios.defaults.headers.common["Authorization"] = `Bearer ${SINDRI_API_KEY}`;
// Expect 2xx responses for all requests.
axios.defaults.validateStatus = (status) => status >= 200 && status < 300;

// Create a new circuit.
process.chdir("packages");
const tarData = tar.c({ gzip: true, sync: true }, ["circuits/"]).read();

const blob = new Blob([tarData], { type: 'application/gzip' });

const formData = new FormData();
formData.append(
  "files",
  blob,
  {
    filename: "compress.tar.gz",
  },
);

const createResponse = await axios.post(
  "/circuit/create",
  formData,
);
const circuitId = createResponse.data.circuit_id;
console.log("Circuit ID:", circuitId);

// Poll for completed status.
let startTime = Date.now();
let circuitDetailResponse;
while (true) {
  circuitDetailResponse = await axios.get(`/circuit/${circuitId}/detail`, {
    params: { include_verification_key: false },
  });
  const { status } = circuitDetailResponse.data;
  const elapsedSeconds = ((Date.now() - startTime) / 1000).toFixed(1);
  if (status === "Ready") {
    console.log(`Polling succeeded after ${elapsedSeconds} seconds.`);
    break;
  } else if (status === "Failed") {
    throw new Error(
      `Polling failed after ${elapsedSeconds} seconds: ${circuitDetailResponse.data.error}.`,
    );
  } else if (Date.now() - startTime > 30 * 60 * 1000) {
    throw new Error("Timed out after 30 minutes.");
  }
  await new Promise((resolve) => setTimeout(resolve, 1000));
}
console.log("Circuit Detail:");
console.log(circuitDetailResponse.data);
const package_name = circuitDetailResponse.data.nargo_package_name;

const { proof, output } = await sindriPollProveRequest(circuitId, {
  x: 1, 
  y: 2,
  z: 3
});


console.log("Proof Output:");
console.log(proof);
console.log("Public Output:");
console.log(output);

})()

