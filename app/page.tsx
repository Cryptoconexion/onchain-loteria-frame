"use client";
import React, { useState } from "react";
import styles from "@styles/home.module.css";
import Navbar from "@components/Navbar";
import Hero from "@components/hero.component";
import Cards from "@components/cards.component";
import NFTArtboard from "@components/NFTArtboard.component";
import Dashboard from "@components/Dashboard.component"; // Corrected to point to Dashboard component
import Footer from "@components/Footer.component";
import { AuthKitProvider } from "@farcaster/auth-kit";
import { generateMetadata } from "@utils/metadataFetcher";







const HomePage = () => {
  const config = {
    relay: "https://relay.farcaster.xyz",
    rpcUrl: "https://mainnet.optimism.io",
    domain: "www.loteria.criptoconexion.com",
    Uri: "https://loteria.criptoconexion.com/login",
  };

  const fullNftData = [
    { id: "nft1", imageUrl: "/chalupa/1.jpg" },
    { id: "nft2", imageUrl: "/chalupa/2.jpg" },
    { id: "nft3", imageUrl: "/chalupa/3.jpg" },
    { id: "nft4", imageUrl: "/chalupa/4.jpg" },
    { id: "nft5", imageUrl: "/chalupa/5.jpg" },
    { id: "nft6", imageUrl: "/chalupa/6.jpg" },
    { id: "nft7", imageUrl: "/chalupa/7.jpg" },
    { id: "nft8", imageUrl: "/chalupa/8.jpg" },
    { id: "nft9", imageUrl: "/chalupa/9.jpg" },
    { id: "nft10", imageUrl: "/chalupa/10.jpg" },
  ];

  const [visibleCount, setVisibleCount] = useState(4);
  const loadMoreNfts = () =>
    setVisibleCount((currentCount) =>
      Math.min(currentCount + 4, fullNftData.length)
    );
  const visibleNfts = fullNftData.slice(0, visibleCount);

  return (
    <AuthKitProvider config={config}>
      <Navbar />
      <Hero />
      <div className="divider">-</div>
      <div className={styles.cardSection}>
        <Cards
          title="How to play"
          description="Mint your NFT board. See your board on OpenSea. Players announced Fridays."
          imageUrl="/landing/cards3.webp"
          buttonText="GO"
        />
        <Cards
          title="Learn, win and support"
          description="Explore the unique features of Onchain Loteria, including blockchain-powered boards, NFTs, and more."
          imageUrl="/landing/cards4.webp"
          buttonText="GO"
        />
        <Cards
          title="Join Our Community"
          description="Become part of the Onchain Loteria community to engage with other players, participate in special events, and enjoy continuous updates and rewards."
          imageUrl="/landing/cards5.webp"
          buttonText="GO"
        />
      </div>

      <div className="divider">-</div>
      <div className="container mx-auto p-4">
        <Dashboard />
      </div>
      <Footer />
    </AuthKitProvider>
  );
};

export default HomePage;


    // <h2 className={styles.h2Title}>Your minted boards</h2>
    //   <NFTArtboard nfts={visibleNfts} />
    //   {visibleCount < fullNftData.length && (
    //     <div className="flex justify-center mt-4">
    //       <button onClick={loadMoreNfts} className="btn btn-primary btn-lg">
    //         Load More...
    //       </button>
    //     </div>
    //   )}