const ethers = require("ethers");

const contractABI = [
  {
    type: "function",
    name: "tokenURI",
    inputs: [{ name: "_tokenId", type: "uint256", internalType: "uint256" }],
    outputs: [{ name: "", type: "string", internalType: "string" }],
    stateMutability: "view",
  },
];

export async function getTokenUri(tokenId) {
  try {
    // Convert tokenId to a number and validate it
    tokenId = Number(tokenId);
    if (isNaN(tokenId)) {
      throw new Error("tokenId must be a number");
    }

    // Define your contract address (use environment variables for production!)
    const contractAddress = process.env.NFT_CONTRACT;

    // Connect to the network using Alchemy or another JSON RPC provider
    const provider = new ethers.JsonRpcProvider(process.env.RPC_URL);

    // Create a contract instance connected to the provider
    const contract = new ethers.Contract(
      contractAddress,
      contractABI,
      provider
    );

    // Execute the contract function to get the token URI
    const uri = await contract.tokenURI(tokenId);
    console.log("Token URI fetched successfully :", uri);

    // Return the fetched URI
    return uri;
  } catch (error: any) {
    console.error("Failed to fetch token URI:", error.message);
    throw error; // Re-throw the error to be handled by the caller
  }
}
