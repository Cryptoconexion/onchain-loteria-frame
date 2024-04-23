// components/Hero.tsx
import React from "react";
import styles from "@styles/home.module.css";
import Image from "next/image";
import Link from "next/link";
import MyButton from "@components/MyButton"; // Adjust the path based on your file structure

interface HeroProps {}

const Hero: React.FC<HeroProps> = () => {
  return (
    <div className={styles.parallax + " bg-base-200"}>
      <div className="hero-overlay bg-opacity-60"></div>
      <div className="text-center hero-content text-neutral-content">
        <div className="max-w-md">
          <div className={styles.titleContainer}>
            <img
              src="/landing/cards.webp"
              alt="Left Decorative"
              className={styles.sideImage}
            />
            <div>
              <h1 className={styles.h1Title}>ONCHAIN</h1>
              <div className={styles.marginhero}>
                {" "}
                <h2 className={styles.h2Title}>Loteria</h2>
              </div>
            </div>
            <img
              src="/landing/cards2.webp"
              alt="Right Decorative"
              className={styles.sideImage}
            />
          </div>
          <p className="mb-5 font-black">
            Join us every Friday at 1 PM EST for our live Lotería game series.
            Engage, learn, connect, and win prizes!
          </p>
          <MyButton href="https://warpcast.com/cryptoconexion/0x2a07fdbb">
            Learn More
          </MyButton>
        </div>
      </div>
    </div>
  );
};

export default Hero;
