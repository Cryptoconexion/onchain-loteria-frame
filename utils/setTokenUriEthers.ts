import fetch from "node-fetch";
const ethers = require("ethers");

const contractABI = [
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "tokenURI",
        type: "string",
      },
    ],
    name: "setTokenURI",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

export async function setTokenUri(tokenId, tokenUri) {
  try {
    console.log("\n\n\n typr tokenId", tokenId);
    tokenId = Number(tokenId);
    if (isNaN(tokenId)) {
      throw new Error("tokenId must be a number");
    }

    // Define your private key and contract address (use environment variables for production!)
    const privateKey = process.env.OWNER_KEY; // Never hard-code private keys in production
    const contractAddress = process.env.NFT_CONTRACT; // The contract address where setTokenURI exists

    // Create a wallet instance
    const wallet = new ethers.Wallet(privateKey);

    // Connect to the network using Alchemy
    const provider = new ethers.JsonRpcProvider(process.env.RPC_URL);

    // Connect your wallet to the provider
    const signer = wallet.connect(provider);

    // Create a contract instance connected to the signer
    const contract = new ethers.Contract(contractAddress, contractABI, signer);

    // Execute the contract function
    const tx = await contract.setTokenURI(tokenId, tokenUri); // Assuming tokenId 0 for the example
    console.log("Transaction successful:", tx);

    const openSeaUrl = `https://testnets-api.opensea.io/api/v2/chain/base-sepolia/contract/${contractAddress}/nfts/${tokenId}/refresh`;
    fetch(openSeaUrl, {
      method: "POST",
      headers: {
        "x-api-key": process.env.OPENSEA_API_KEY || "", // Ensure you have the API key stored in your environment variables
      },
    })
      .then((response) => response.json())
      .then((data) => console.log("OpenSea refresh initiated:", data))
      .catch((err) => console.error("Failed to call OpenSea:", err));

    return true;
    return true;
  } catch (error) {
    console.error("Error setting token URI:", error);
    return false;
  }
}


