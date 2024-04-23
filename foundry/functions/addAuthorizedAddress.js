// Import ethers for interacting with the Ethereum blockchain
import { ethers } from "ethers";
// Import ckey for securely managing private keys (ensure you have 'ckey' installed or manage the private key securely)
import ck from "ckey";

// Assuming the ABI file is located relative to this script as described,
// and you are using a modern version of Node.js that requires type assertion for importing JSON.
import abi from "../out/CarpinteroNFT.sol/CarpinteroNFT.json" assert { type: "json" };

/**
 * Adds an authorized address to the CarpinteroNFT contract.
 *
 * @param {string} address The address to authorize.
 * @returns {Promise<string>} The transaction hash of the authorization operation.
 */
async function addAuthorizedAddress(address) {
  // Initialize the provider to connect to the Ethereum network
  const provider = new ethers.providers.JsonRpcProvider("https://sepolia.base.org");

  // Create a signer from the OWNER_KEY stored in ckey
  const signer = new ethers.Wallet(ck.OWNER_KEY, provider);

  // Create a new contract instance with the signer, which allows sending transactions
  const contract = new ethers.Contract(ck.CONTRACT_ADDRESS, abi.abi, signer);
  console.log("\n\n", ck.CONTRACT_ADDRESS);
  console.log("\n\n", abi.abi);
  console.log("\n\n", signer);

  // Call the `addAuthorizedAddress` function on the contract with the address to authorize
  const tx = await contract.addAuthorizedAddress(address);

  // Wait for the transaction to be mined
  await tx.wait();

  // Return the transaction hash
  return tx.hash;
}

// Export the function so it can be imported and used in other parts of your application
export { addAuthorizedAddress };

// await addAuthorizedAddress("0xCEA74Db6Ba2C253FbCDb3B6498d96A96728550BB");
// Example usage: Immediately Invoked Function Expression (IIFE) to run the function
(async () => {
  try {
    // Replace '' with the actual Ethereum address you want to authorize
    const addressToAuthorize = "0x65FD25851A9f3f7DA6831B2084E85708921968BA";

    // Ensure the address is not empty and is a valid Ethereum address
    if (!ethers.utils.isAddress(addressToAuthorize)) {
      throw new Error("Invalid Ethereum address.");
    }

    // Call the function and log the transaction hash
    const txHash = await addAuthorizedAddress(addressToAuthorize);
    console.log(`Transaction hash: ${txHash}`);
  } catch (error) {
    console.error(`Error occurred: ${error.message}`);
  }
})();
