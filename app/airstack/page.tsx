"use client";
import { gql, GraphQLClient } from "graphql-request";
import { useState, useEffect } from "react";

const AIRSTACK_API_URL = "https://api.airstack.xyz/graphql";
const AIRSTACK_API_KEY = process.env.AIRSTACK_API_KEY;

const tokenNftsQuery = gql`
  query TokenNftsQuery {
    TokenNfts(
      input: {
        filter: {
          address: { _eq: "0x60E4d786628Fea6478F785A6d7e704777c86a7c6" }
        }
        blockchain: ethereum
      }
    ) {
      TokenNft {
        tokenId
        rawMetaData
        metaData {
          name
          description
          image
          attributes {
            trait_type
            value
          }
        }
      }
      pageInfo {
        nextCursor
        prevCursor
      }
    }
  }
`;

interface Attribute {
  trait_type: string;
  value: string;
}

interface MetaData {
  name: string;
  description: string;
  image: string;
  attributes: Attribute[];
}

interface TokenNFT {
  tokenId: string;
  rawMetaData: string;
  metaData: MetaData;
}

interface TokenNftsResponse {
  TokenNfts?: {
    TokenNft: TokenNFT[];
    pageInfo: {
      nextCursor: string;
      prevCursor: string;
    };
  };
}

export default function AirstackPage() {
  const [tokenNfts, setTokenNfts] = useState<TokenNFT[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const graphQLClient = new GraphQLClient(AIRSTACK_API_URL, {
      headers: {
        Authorization: `Bearer ${AIRSTACK_API_KEY}`,
      },
    });

    async function fetchTokenNfts() {
      try {
        const responseData = await graphQLClient.request<TokenNftsResponse>(
          tokenNftsQuery
        );
        setTokenNfts(responseData.TokenNfts?.TokenNft || []);
      } catch (error) {
        console.error("Error fetching token NFTs:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchTokenNfts();
  }, []);

  return (
    <div>
      <h1>Integration of Airstack API in Next.js</h1>
      <h2>Token NFTs</h2>
      {loading ? (
        <p>Loading token NFTs...</p>
      ) : tokenNfts.length > 0 ? (
        <div>
          {tokenNfts.map((nft, index) => (
            <div key={index}>
              <h3>
                {nft.metaData.name} (Token ID: {nft.tokenId})
              </h3>
              <img
                src={nft.metaData.image}
                alt={nft.metaData.name}
                style={{ maxWidth: "100px" }}
              />
              <p>Description: {nft.metaData.description}</p>
              {nft.metaData.attributes.map((attr, idx) => (
                <p key={idx}>
                  {attr.trait_type}: {attr.value}
                </p>
              ))}
            </div>
          ))}
        </div>
      ) : (
        <p>No token NFTs found.</p>
      )}
    </div>
  );
}
