/** @jsxImportSource frog/jsx */

import { Button, Frog, TextInput, parseEther } from "frog";
import { devtools } from "frog/dev";
import { pinata } from "frog/hubs";
import { serveStatic } from "frog/serve-static";
import { generateRandomBoard } from "@utils/generateRandomBoard";
import { insertBoard } from "@db/db";
import { getBoardlessTokens } from "@utils/getBoardlessTokens";
import { getRandomQuestion, Quiz } from "@utils/getRandomQuestion";
import { Board } from "@models/board.model";
import { getTokenIdFromTxHash } from "@scripts/getTokenIdFromTxHash";
import { getTotalPrice } from "@utils/getTotalPrice";
import { getDegenAllowance } from "@utils/getDegenAllowance";
// New type definition for the quiz format

import axios from "axios";
const abi = require("@abi/OnchainLoteria.json");
const abiDegen = require("@abi/DEGEN.json");
import { createSystem } from "frog/ui";

import {
  Box,
  Heading,
  Text,
  VStack,
  vars,
  Divider,
  Rows,
  Row,
  Image,
} from "../../../src/ui";

import path from "path";
import { handle } from "frog/vercel";
// import Image from "next/image";

const app = new Frog({
  assetsPath: "/",
  basePath: "/api",
  hub: pinata(),
  ui: { vars },
});

type State = {
  url: string;
  sequence: number[];
  txId: string;
};

let state: State = {
  sequence: [0],
  url: "",
  txId: "",
};
let backup;

app.frame("/", async (c) => {
  return c.res({
    image: <Image src={`${process.env.URL}/welcome.png`} />,
    intents: [<Button action="/trivia">Start</Button>],
  });
});

app.frame("/trivia", async (c) => {
  // ;
  try {
    const quiz: Quiz = getRandomQuestion();
    console.log("Quiz", quiz);

    return c.res({
      image: (
        <div
          style={{
            color: "white",
            display: "flex",
            flexDirection: "column",
            fontSize: 40,
          }}
        >
          <Image src="/trivia-intro.png" />
          <Box
            color="red100"
            display="flex"
            flexDirection="column"
            padding="10"
            paddingTop="20"
            fontSize="12"
            fontFamily={"ps2p"}
            borderBottom="1px solid white"
            backgroundColor="gray1000"
            borderRadius="8"
          >
            {quiz.q}
          </Box>

          <Box
            display="flex"
            flexDirection="column"
            padding="12"
            fontSize="12"
            fontFamily={"ps2p"}
            borderBottom="1px solid  #380238"
            borderRadius="8"
            backgroundColor="gray100"
          >
            (A) {quiz.a.text}
          </Box>

          <Box
            display="flex"
            flexDirection="column"
            padding="12"
            fontSize="12"
            fontFamily={"ps2p"}
            borderBottom="1px solid #380238"
            borderRadius="8"
            backgroundColor="gray100"
          >
            (B) {quiz.b.text}
          </Box>

          <Box
            display="flex"
            flexDirection="column"
            padding="12"
            fontSize="12"
            fontFamily={"ps2p"}
            borderBottom="1px solid  #380238"
            borderRadius="8"
            backgroundColor="gray100"
          >
            (C) {quiz.c.text}
          </Box>
        </div>
      ),
      intents: [
        <Button action="/newboard">A</Button>,
        <Button action="/trivia">B</Button>,
        <Button action="/trivia">C</Button>,
      ],
    });
  } catch (error) {
    console.error("Error generating board:", error);
    // Ensure to return a response object in case of an error too.
    return c.res({
      image: "An error occurred. Please try again.",
      intents: [<Button.Reset>Reset</Button.Reset>],
    });
  }
});

app.frame("/newboard", async (c) => {
  // QmX6h5Uw1zKM3hjRbCijHK8U1HddLigBNKMDg9u8AR4ses;
  try {
    const board = await generateRandomBoard();

    state = {
      sequence: board.sequence || "",
      url: board.imageBoard || "",
      txId: "",
    };

    return c.res({
      image: board.imageBoard || "",
      intents: [
        <Button action="/newboard">Randomize</Button>,
        <Button action="/offers">Bundles</Button>,

        <Button.Transaction action="/finish" target="/mint1">
          Mint
        </Button.Transaction>,
      ],
    });
  } catch (error) {
    console.error("Error generating board:", error);
    // Ensure to return a response object in case of an error too.
    return c.res({
      image: "An error occurred. Please try again.",
      intents: [<Button.Reset>Reset</Button.Reset>],
    });
  }
});

app.frame("/offers", async (c) => {
  // Assuming `tokenUri` function uploads an image to IPFS and returns the URI.
  // Update the message to be clearer and more visually appealing
  return c.res({
    image: <Image src={`${process.env.URL}/bundlesPromos.png`} />,

    intents: [
      <Button.Transaction action="/finish" target="/mint10">
        10x
      </Button.Transaction>,
      <Button.Transaction action="/finish" target="/mint25">
        25x
      </Button.Transaction>,
      <Button.Transaction action="/finish" target="/mint100">
        100x
      </Button.Transaction>,
    ],
  });
});

app.frame("/finish", async (c) => {
  const { transactionId } = c;

  console.log("\n\n\n\nTransaction ID", transactionId);

  const response = await insertBoard(state.sequence, transactionId);
  // const tokenId = await getTokenIdFromTxHash(transactionId);

  let collection = `https://opensea.io/assets/base/${process.env.NFT_CONTRACT}/`;

  // if (tokenId != null) {
  //   collection = collection + tokenId + "";
  // }
  return c.res({
    image: <Image src={`${process.env.URL}/finish.png`} />,
    intents: [
      <Button action="/newboard">Randomize</Button>,
      <Button action="/offers">Bundles</Button>,
      <Button.Link href={collection}>Collection</Button.Link>,
    ],
  });
});

// app.frame("/finish2", async (c) => {
//   const { transactionId } = c;

//   console.log("\n\n\n\nTransaction ID", transactionId);

//   // const response = await insertBoard(state.sequence, transactionId);

//   return c.res({
//     image: <Image src={`${process.env.URL}/finish.png`} />,
//     intents: [
//       <Button.Link href="https://loteria.cryptoconexion.com/">
//         Visit Web Page
//       </Button.Link>,
//       <Button action="/newboard">Randomize</Button>,
//     ],
//   });
// });

// chainId: "eip155:8453",
app.transaction("/mint1", async (c) => {
  const quantity = "1";
  console.log("\n\n transaction quantity", quantity);

  const price = await getTotalPrice(quantity);
  const contractAddress = process.env.NFT_CONTRACT || "";
  // const chainId = `eip155:${"eip155:8453"_ID}`;
  // const price = parseEther("100");
  console.log("\n\n price", price);
  return c.contract({
    abi: abi,
    chainId: "eip155:8453",
    functionName: "mintNFT",
    args: [quantity],
    to: contractAddress as `0x${string}`,
    value: price,
    // value: price,
  });
});

app.transaction("/mint10", async (c) => {
  const quantity = "10";
  const price = await getTotalPrice(quantity);
  const contractAddress = process.env.NFT_CONTRACT || "";
  // const chainId = `eip155:${"eip155:8453"_ID}`;
  // const price = parseEther("900");

  return c.contract({
    abi: abi,
    chainId: "eip155:8453",
    functionName: "mintNFT",
    args: [quantity],
    to: contractAddress as `0x${string}`,
    value: price,
    // value: parseEther("0.0000000001"),
  });
});
app.transaction("/mint25", async (c) => {
  const quantity = "25";
  const price = await getTotalPrice(quantity);
  const contractAddress = process.env.NFT_CONTRACT || "";
  // const chainId = `eip155:${"eip155:8453"_ID}`;
  // const price = parseEther("2000");

  return c.contract({
    abi: abi,
    chainId: "eip155:8453",
    functionName: "mintNFT",
    args: [quantity],
    to: contractAddress as `0x${string}`,
    value: price,
    // value: parseEther("0.0000000001"),
  });
});
app.transaction("/mint100", async (c) => {
  const quantity = "100";
  const price = await getTotalPrice(quantity);
  const contractAddress = process.env.NFT_CONTRACT || "";
  // const chainId = `eip155:${"eip155:8453"_ID}`;
  // const price = parseEther("5000");

  return c.contract({
    abi: abi,
    chainId: "eip155:8453",
    functionName: "mintNFT",
    args: [quantity],
    to: contractAddress as `0x${string}`,
    value: price,
    // value: parseEther("0.0000000001"),
  });
});

devtools(app, { serveStatic });

export const GET = handle(app);
export const POST = handle(app);
