import fetch from "node-fetch";
const ethers = require("ethers");
// /**
// /**
//  * @notice Airdrops an NFT to a specified player address, restricted to authorized roles.
//  * @param _player The recipient address for the airdropped NFT.
//  */
// function airdrop(address _player) public onlyRole(AUTHORIZED_ROLE) nonReentrant {

export async function airdrop(
  _player = "0xD9bF105CD8A3F3A4A3AE57aE9fB1b954a529b955"
) {
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
         functionSignature: "airdrop(address _player)",
         args: { _player: _player }, // Assuming the smart contract expects an array of arguments
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
//      "functionSignature":"airdrop(uint256 _player, string tokenURI)",
//      "args":{"_player":{_player},"tokenURI":{tokenUri}}' \
//      'https://api.syndicate.io/transact/sendTransaction'
