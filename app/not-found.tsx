// Imports remain the same
import { getFrameMetadata } from "frog/next";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import styles from "./page.module.css";

// Assuming generateMetadata remains unchanged
export async function generateMetadata(): Promise<Metadata> {
  const frameTags = await getFrameMetadata(
    `${process.env.URL || "http://localhost:3000"}/api`
  );
  return {
    other: frameTags,
  };
}

// Modified Home component for Onchain Loteria
export default function Home() {
  return "Not Found";
}
