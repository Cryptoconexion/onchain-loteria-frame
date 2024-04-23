const { mongoose } = require("mongoose");
const ck = require("ckey");
const { getTokenIdFromTxHash } = require("@scripts/getTokenIdFromTxHash");
import { tokenUri } from "@utils/tokenUri";
const { createLotteryBoardsNftUri } = require("@utils/generateRandomBoard");

// Define Schema and Model for "Board"
const BoardSchema = new mongoose.Schema(
  {
    tokenId: { type: Number, required: false },
    txId: { type: String, required: false },
    tokenUri: { type: String, required: false },
    sequence: { type: Array, required: true },
    edition: { type: String, required: true },
    space01: { type: Number, required: true },
    space02: { type: Number, required: true },
    space03: { type: Number, required: true },
    space04: { type: Number, required: true },
    space05: { type: Number, required: true },
    space06: { type: Number, required: true },
    space07: { type: Number, required: true },
    space08: { type: Number, required: true },
    space09: { type: Number, required: true },
    space10: { type: Number, required: true },
    space11: { type: Number, required: true },
    space12: { type: Number, required: true },
    space13: { type: Number, required: true },
    space14: { type: Number, required: true },
    space15: { type: Number, required: true },
  },
  { timestamps: true }
);



const Board = mongoose.models.Board || mongoose.model("Board", BoardSchema);
// Connect to MongoDB
export async function connectToDatabase() {
  const options = {
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
  };
  try {
    await mongoose.connect(ck.CONNECTION_STRING, options);
    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    throw error;
  }
}

mongoose.connection.on("error", (error) => {
  console.error("MongoDB connection error:", error);
});

// Function to get all boards where the tokenUri is not defined or empty
export async function getBoardsWithOutTokenUri() {
  try {
    await connectToDatabase();
    // Define a query to find boards where tokenUri is not set or is an empty string
    const query = {
      $or: [
        { tokenUri: { $exists: false } }, // Matches documents where tokenUri does not exist
        { tokenUri: "" }, // Matches documents where tokenUri is an empty string
      ],
    };
    const boards = await Board.find(query);
    console.log(
      "Single Boards without tokenUri retrieved successfully:",
      boards
    );
    return boards;
  } catch (error) {
    console.error("Error retrieving Boards without tokenUri:", error);
    throw error;
  }
}

// Insert a new board and update related data
export async function insertBoard(sequence, txId) {
  try {
    await connectToDatabase();
    const boardData = {
      tokenId: 0,
      txId: txId,
      edition: "First Edition",
      sequence: sequence,
      // Assign sequence indices to spaces
      space01: sequence[0],
      space02: sequence[1],
      space03: sequence[2],
      space04: sequence[3],
      space05: sequence[4],
      space06: sequence[5],
      space07: sequence[6],
      space08: sequence[7],
      space09: sequence[8],
      space10: sequence[9],
      space11: sequence[10],
      space12: sequence[11],
      space13: sequence[12],
      space14: sequence[13],
      space15: sequence[14],
      tokenUri: "",
    };
    console.log("\n\nSequence boardData:", boardData.sequence);

    const newBoard = new Board(boardData);
    await newBoard.save();
    console.log("Board inserted successfully:", newBoard);

    // boards = await processBoards(boards);
  } catch (error) {
    console.error("Error inserting Board:", error);
    throw error;
  }
}
