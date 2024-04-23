const ethers = require("ethers");

const contractABI = [
  {
    type: "function",
    name: "totalSupply",
    inputs: [],
    outputs: [{ name: "", type: "uint256", internalType: "uint256" }],
    stateMutability: "view",
  },
];

export async function getTotalSupply() {
  try {
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

    const _totalSupplyBigInt = await contract.totalSupply();

    // // Convert BigInt to a number, only if it is within the safe integer range
    // if (_totalSupplyBigInt <= Number.MAX_SAFE_INTEGER) {
    //   const _totalSupplyNumber = Number(_totalSupplyBigInt);
    //   console.log("Total supply as number:", _totalSupplyNumber);
    // } else {
    //   console.error(
    //     "Total supply exceeds the safe integer range and cannot be converted reliably."
    //   );
    // }
    return Number(_totalSupplyBigInt);
  } catch (error: any) {
    console.error("Failed to fetch token URI:", error.message);
    throw error; // Re-throw the error to be handled by the caller
  }
}
