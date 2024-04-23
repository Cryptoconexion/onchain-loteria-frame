import Link from "next/link";
import Image from "next/image";
import MyButton from "@components/MyButton"; // Adjust the path based on your file structure

// Modified Home component for Onchain Loteria
export default function Home() {
  return (
    <div>
      <h1>Welcome to Onchain Loteria!</h1>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        <p>
          Dive into the future of lottery games with{" "}
          <strong>Onchain Loteria</strong>. Edit&nbsp;
          <code>app/page.tsx</code> to customize your experience.
        </p>
        <p>
          Check out the API in action at{" "}
          <a href="/api/dev" style={{ display: "inline", fontWeight: "bold" }}>
            <code>/api/dev</code>
          </a>
        </p>
      </div>
      <Image
        src={`/chalupa/1.jpg`}
        alt="Onchain Loteria Logo"
        width={250}
        height={250}
      />

      <h2>
        <MyButton href="/">Home</MyButton>
      </h2>
    </div>
  );
}
