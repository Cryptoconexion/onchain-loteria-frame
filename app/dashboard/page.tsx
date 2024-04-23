import Link from "next/link";
import Image from "next/image";
import MyButton from "@components/MyButton"; // Adjust the path based on your file structure

// Modified Home component for Onchain Loteria
export default function Home() {
  return (
    <div>
      <h1>Dasboard</h1>

      <Link href="/dashboard/test">TEST</Link>
    </div>
  );
}
