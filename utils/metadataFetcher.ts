// metadataFetcher.ts
import { getFrameMetadata } from "frog/next";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const frameTags = await getFrameMetadata(
    `${process.env.URL || "http://localhost:3000"}/api`
  );
  return {
    other: frameTags,
  };
}
