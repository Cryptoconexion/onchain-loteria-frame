const ethers = require("ethers");

const contractABI = [
  {
    type: "function",
    name: "getTotalPrice",
    inputs: [{ name: "quantity", type: "uint256", internalType: "uint256" }],
    outputs: [{ name: "totalPrice", type: "uint256", internalType: "uint256" }],
    stateMutability: "pure",
  },
];


export async function getTotalPrice(quantity) {
  try {
    // Convert quantity to a number and validate it
    quantity = Number(quantity);
    if (isNaN(quantity)) {
      throw new Error("quantity must be a number");
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

    // Execute the contract function to get the token price
    const price = await contract.getTotalPrice(quantity);
    console.log("Token price fetched successfully:", price);

    // Return the fetched price
    return price;
  } catch (error: any) {
    console.error("Failed to fetch token price:", error.message);
    throw error; // Re-throw the error to be handled by the caller
  }
}
