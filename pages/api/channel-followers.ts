//app/nft-board-uri-process/page.ts

import { getChannelFollowers } from "@airstack/getChannelFollowers";

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
  data: any;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse>
) {
  try {
    // Simulate some async operation, like interacting with a blockchain or a database
    const participants = await getChannelFollowers();
    res.status(200).json({
      message: "getChannelFollowers successfully",
      data: participants,
    });
  } catch (error) {
    // Handle any errors that occur during the process
    console.error("getChannelFollowers:", error);
    res
      .status(500)
      .json({ message: "Failed to process NFT Board URI", data: [] });
  }
}
