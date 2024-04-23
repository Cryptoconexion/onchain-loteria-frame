import fetch from "node-fetch";
const ethers = require("ethers");

//  /**
//    * @notice Allows the withdrawal of contract funds by authorized roles, transferring the balance to the contract owner.
//    */
//   function withdraw() external onlyRole(AUTHORIZED_ROLE) nonReentrant {

export async function withdraw() {
  try {
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
          functionSignature: "withdraw()",
          args: {},
        }),
      }
    );

    const rawResponse = await syndicateResponse.text(); // Only read once
    console.log("\n\nSyndicate API raw response:", rawResponse);

    const syndicateData = JSON.parse(rawResponse); // Parse the raw response text as JSON
    console.log("\n\nSyndicate API response:", syndicateData);

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
//      "functionSignature":"withdraw(uint256 _newMintPrice, string tokenURI)",
//      "args":{"_newMintPrice":{_newMintPrice},"tokenURI":{tokenUri}}' \
//      'https://api.syndicate.io/transact/sendTransaction'
