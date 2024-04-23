"use client";
import React, { useState, useEffect } from "react";
import styles from "@styles/home.module.css";
import Hero from "@components/hero.component";
import Cards from "@components/cards.component";
import NFTArtboard from "@components/NFTArtboard.component";
import Dashboard from "@components/Dashboard.component"; // Corrected to point to Dashboard component
import Footer from "@components/Footer.component";
import MyButton from "@components/MyButton"; // Adjust the path based on your file structure
import Link from "next/link";

import { getChannelFollowers } from "@airstack/getChannelFollowers";

const Debug = () => {
  // const config = {
  //   relay: "https://relay.farcaster.xyz",
  //   rpcUrl: "https://mainnet.optimism.io",
  //   domain: "www.loteria.criptoconexion.com",
  //   uri: "https://loteria.criptoconexion.com/login", // Make sure the case of `uri` is consistent with its usage
  // };

  // const [visibleCount, setVisibleCount] = useState(4);
  // const [followersContext, setFollowersContext] = useState();

  // async function getFollowers() {
  //   try {
  //     const followers = await getChannelFollowers();
  //     setFollowersContext(followers);
  //   } catch (error) {
  //     console.error("Error fetching followers:", error);
  //   }
  // }

  // useEffect(() => {
  //   // Load followers when component mounts or profile updates
  //   if (profile) {
  //     getFollowers();
  //   }
  // }, [profile]);

  // const loadMoreNfts = () =>
  //   setVisibleCount(
  //     (currentCount) => Math.min(currentCount + 4, fullNftData.length) // Ensure `fullNftData` is defined and available within the component
  //   );

  // Uncomment the line below once `fullNftData` is available in the component
  // const visibleNfts = fullNftData.slice(0, visibleCount);
  return (
    // Enclose your JSX elements in a React.Fragment (short syntax <> </>)
    <>
      <MyButton href="/api/nft-board-uri-process">Process Boards</MyButton>
      <MyButton href="/api/channel-followers">channel-followers</MyButton>
      <MyButton href="/api/set-mint-price">set-mint-price</MyButton>
      <MyButton href="/api/withdraw">withdraw</MyButton>
      <MyButton href="/api/airdrop">airdrop</MyButton>
      <MyButton href="/airstack">airstack</MyButton>
    </>
  );
};

export default Debug;
