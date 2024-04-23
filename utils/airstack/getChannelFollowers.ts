//https://docs.airstack.xyz/airstack-docs-and-faqs/get-started/quickstart/direct-api-call
import fetch from "node-fetch";

interface QueryResponse {
  data: Data;
}

interface Data {
  Degen: {
    TokenBalance: TokenBalance[];
    pageInfo: PageInfo;
  };
}

interface TokenBalance {
  amount: string;
  tokenAddress: string;
  tokenId: string;
  tokenType: string;
  tokenNfts: {
    tokenURI: string;
  }[];
  owner: {
    identity: string;
    addresses: string[];
  };
}

interface PageInfo {
  nextCursor: string | null;
  prevCursor: string | null;
}

interface Error {
  message: string;
}

const AIRSTACK_API_URL = "https://api.airstack.xyz/graphql";
const AIRSTACK_API_KEY = process.env.AIRSTACK_API_KEY;

export async function getChannelFollowers() {
  const query = `
query MyQuery {
  FarcasterChannels(
    input: {blockchain: ALL, filter: {channelId: {_eq: "onchainloteria"}}, limit: 200}
  ) {
    FarcasterChannel {
      participants {
        participant {
          profileName
          fid: userId
          userAssociatedAddresses
          followerCount
        }
      }
    }
  }
} `;

  try {
    if (!AIRSTACK_API_KEY) throw new Error("AIRSTACK_API_KEY not set");

    const res = await fetch(AIRSTACK_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${AIRSTACK_API_KEY}`, // Ensures Authorization header is correctly formatted
      },
      body: JSON.stringify({ query }),
    });

    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);

    const json: any = (await res.json()) as QueryResponse;

    const data = json.data?.FarcasterChannels?.FarcasterChannel[0].participants;
    console.log(data);
    return data; // Returns the
  } catch (e) {
    console.error(`Error: ${(e as Error).message}`);
    throw e; // Rethrow to handle errors outside this function if necessary
  }
}

// // Example usage
// getTokenIdsFromFid("your_fid_value")
//   .then((data) => {
//     console.log(data);
//   })
//   .catch((e) => {
//     console.error(e);
//   });
