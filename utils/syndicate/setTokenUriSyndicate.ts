import fetch from "node-fetch";
const ethers = require("ethers");

const contractABI = [
  {
    inputs: [
      { internalType: "uint256", name: "tokenId", type: "uint256" },
      { internalType: "string", name: "tokenURI", type: "string" },
    ],
    name: "setTokenURI",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];
export async function setTokenUriSyndicate(tokenId, tokenUri) {
  try {
    // Validate tokenId
    tokenId = Number(tokenId);
    if (isNaN(tokenId)) {
      throw new Error("tokenId must be a number");
    }
    // 666666666
    // 84532;
    // Send transaction via Syndicate API
    const syndicateResponse = await fetch(
      "https://api.syndicate.io/transact/sendTransaction",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.SYNDICATE_API_KEY}`,
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          projectId: process.env.SYNDICATE_PROJECT_ID,
          contractAddress: process.env.NFT_CONTRACT,
          chainId: 8453,
          functionSignature: "setTokenURI(uint256 _tokenId, string _uri)",
          args: {
            _tokenId: tokenId, // Make sure tokenId is defined and holds the correct value
            _uri: tokenUri, // Ensure tokenUri is defined and holds the correct URI value
          },
        }),
      }
    );

    const rawResponse = await syndicateResponse.text(); // Only read once
    console.log("\n\nSyndicate API raw response:", rawResponse);

    const syndicateData = JSON.parse(rawResponse); // Parse the raw response text as JSON
    console.log("\n\nSyndicate API response:", syndicateData);

    const openSeaUrl = `https://api.opensea.io/api/v2/chain/base/contract/${process.env.NFT_CONTRACT}/nfts/${tokenId}/refresh`;
    const openSeaResponse = await fetch(openSeaUrl, {
      method: "POST",
      headers: {
        "x-api-key": process.env.OPENSEA_API_KEY || "",
      },
    });
    const openSeaData = await openSeaResponse.json();
    console.log("OpenSea refresh initiated:", openSeaData);

    return true;
  } catch (error) {
    console.error("Error setting token URI:", error);
    return false;
  }
}

function sleep(milliseconds: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
}



// curl -H 'Authorization: Bearer process.env.SYNDICATE_API_KEY' \
//      -H "Content-type: application/json" \
//      -d '{ "projectId": process.env.SYNDICATE_PROJECT_ID,"contractAddress":process.env.NFT_CONTRACT,"chainId"::process.env.CHAIN_ID,
//      "functionSignature":"setTokenURI(uint256 tokenId, string tokenURI)",
//      "args":{"tokenId":{tokenId},"tokenURI":{tokenUri}}' \
//      'https://api.syndicate.io/transact/sendTransaction'

