import { createPublicClient, http, createWalletClient } from "viem";
import { mainnet } from "viem/chains";
import { privateKeyToAccount } from "viem/accounts";
import ck from "ckey";
const clientP = createPublicClient({
  chain: mainnet,
  transport: http(),
});

const blockNumber = await clientP.getBlockNumber();

console.log("  blockNumber :", blockNumber);

console.log(" \n\n\n process.env.PRIVATE_KEY :", ck.PRIVATE_KEY);

const account = privateKeyToAccount(
  ck.PRIVATE_KEY // SECRET
);

console.log("  account :", account);

const clientW = createWalletClient({
  account,
  chain: mainnet,
  transport: http(),
});
