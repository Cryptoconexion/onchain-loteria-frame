// Rename your file to refreshOpenSeaMetadata.mjs or add "type": "module" in your package.json
import fetch from "node-fetch";

const startTokenId = 1;
import ck from "ckey";
import { getTotalSupply } from "@utils/getTotalSupply";

export async function refreshOpenSeaToken() {
  const contractAddress = process.env.NFT_CONTRACT; // The contract address where setTokenURI exists

  const endTokenId = await getTotalSupply();

  for (let tokenId = endTokenId; tokenId >= startTokenId; tokenId--) {
    try {
      const openSeaUrl = `https://api.opensea.io/api/v2/chain/base/contract/${contractAddress}/nfts/${tokenId}/refresh`;
      console.log(`\n\nCalling OpenSea for tokenId ${tokenId}:`, openSeaUrl);

      const response = await fetch(openSeaUrl, {
        method: "POST",
        headers: {
          "x-api-key": process.env.OPENSEA_API_KEY || "",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP status ${response.status}`);
      }
      const data = await response.json();
      console.log(`OpenSea refresh initiated for tokenId ${tokenId}:`, data);
    } catch (err) {
      console.error(`Failed to call OpenSea for tokenId ${tokenId}:`, err);
    }

    // Delay to prevent hitting API rate limits
    await new Promise((resolve) => setTimeout(resolve, 1000)); // 1000 milliseconds delay between requests
  }
}

// refreshOpenSeaToken();
