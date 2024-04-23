//app/nft-board-uri-process/page.ts

import { refreshOpenSeaToken } from "@utils/refreshOpenSeaToken";

import type { NextApiRequest, NextApiResponse } from "next";
// if (req.headers.get("Authorization") !== `Bearer ${process.env.CRON_SECRET}`) {
//   return res.status(401).end("Unauthorized");
// }

// This function can run for a maximum of 5 seconds
export const config = {
  maxDuration: 300,
};
// Define a type for the response to ensure type safety
type ApiResponse = {
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse>
) {
  try {
    // Simulate some async operation, like interacting with a blockchain or a database
    await refreshOpenSeaToken();
    res.status(200).json({ message: "NFT Board URI processed successfully" });
  } catch (error) {
    // Handle any errors that occur during the process
    console.error("Failed to process NFT Board URI:", error);
    res.status(500).json({ message: "Failed to process NFT Board URI" });
  }
}

// $%c@ycw%rhw$^v%%$fdg%$
