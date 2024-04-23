import { getBoardsWithOutTokenUri } from "@db/db";
import { getTokenIdFromTxHash } from "@scripts/getTokenIdFromTxHash";
import { tokenUri } from "@utils/tokenUri";
import { setTokenUriSyndicate } from "@syndicate/setTokenUriSyndicate";
import { createLotteryBoardsNftUri } from "@utils/generateRandomBoard";
import { getBoardlessTokens } from "@utils/getBoardlessTokens";
import { randomSequence } from "@utils/randomSequence";
import { getTokenUri } from "@utils/getTokenUri";
// Process boards to fill Token IDs and upload URIs
export async function proccesBoardlessNFT() {
  let boards = await getBoardsWithOutTokenUri();
  for (let board of boards) {
    console.log("\nProcessing board:", board);
    try {
      board = await fillTokenIds(board);
      board = await createLotteryBoardsNftUri(board);
      const succesful = await setTokenUriSyndicate(
        board.tokenId,
        board.tokenUri
      );

      if (succesful) {
        await board.save();
      }
    } catch (error: any) {
      console.error("Error processing board:", error);
    }
  }

  if (boards.length == 0) {
    const tokensIdList = await getBoardlessTokens();

    for (let tokenId of tokensIdList) {
      const sequence = randomSequence(16);
      console.log("\n\n\nBundle Sequence...", sequence);
      let bundleBoard = {
        tokenId: tokenId,
        txId: "bundle",
        edition: "First Edition",
        sequence: sequence,
        tokenUri: "",
      };
      bundleBoard = await createLotteryBoardsNftUri(bundleBoard);

      const succesful = await setTokenUriSyndicate(
        bundleBoard.tokenId,
        bundleBoard.tokenUri
      );
    }
  }
  return boards;
}

// Fill Token IDs for boards with non-empty transaction IDs
async function fillTokenIds(board: any): Promise<any> {
  // Consider a more specific type instead of 'any'
  if (board.txId) {
    const tokenId = await getTokenIdFromTxHash(board.txId);
    board.tokenId = tokenId;
    console.log("\nFilling Token ID for board:", board.tokenId);
    await board.save();
  }
  return board;
}

function sleep(milliseconds: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
}
