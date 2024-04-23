const { ethers } = require("ethers");

// Initialize the interface for ERC-721 once, for use in decoding logs
const iface = new ethers.Interface([
  "event Transfer(address indexed from, address indexed to, uint256 indexed tokenId)",
]);

// Function to get token ID from transaction hash
async function getTokenIdFromTxHash(txHash) {
  // Connect to the Sepolia network using a correct and valid provider URL
  
 const provider = new ethers.JsonRpcProvider(process.env.RPC_URL);

  try {
    const receipt = await provider.getTransactionReceipt(txHash);
    if (!receipt || !receipt.logs) {
      console.log("No logs found in the transaction receipt.");
      return null;
    }

    // Loop through all logs to find the ERC-721 Transfer event
    for (let log of receipt.logs) {
      try {
        const decoded = iface.parseLog(log);
        if (decoded && decoded.name === "Transfer") {
          return decoded.args.tokenId.toString();
        }
      } catch (error) {
        // This log was not an ERC-721 Transfer event
      }
    }

    console.log("No ERC-721 Transfer event found.");
    return null;
  } catch (error) {
    console.error("Error fetching transaction receipt: ", error);
    return null;
  }
}



// Example usage
// getTokenIdFromTxHash(
//   "0xade23e9d27cf8fb53ec0fcf5bad73f23dd32d1b6c3caac4e3dcfc596e0a06019"
// )
//   .then((tokenId) => {
//     console.log("Token ID: ", tokenId);
//   })
//   .catch((err) => {
//     console.error(err);
//   });

module.exports = { getTokenIdFromTxHash };
