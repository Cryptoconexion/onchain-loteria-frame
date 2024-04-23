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
  {
    type: "function",
    name: "getBoardlessTokens",
    inputs: [],
    outputs: [{ name: "", type: "uint256[]", internalType: "uint256[]" }],
    stateMutability: "view",
  },
];

export async function getBoardlessTokens() {
  try {
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
    const tokensListBigInt = await contract.getBoardlessTokens(); // Assuming tokenId 0 for the example

    const tokensList = tokensListBigInt.map((tokenId) => Number(tokenId));

    console.log("\nTokens without board:", tokensList);
    return tokensList;
  } catch (error) {
    console.error("Error setting token URI:", error);
    return [];
  }
}
