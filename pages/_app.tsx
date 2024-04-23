import "../app/globals.css"; // Ensure this path correctly points to your global CSS
import Head from "next/head";
import Navbar from "../components/Navbar"; // Adjust path according to your project structure
import Footer from "../components/Footer.component"; // Adjust path according to your project structure

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title> ONCHAIN Loteria</title>
        <link rel="icon" href="/favicon.ico" />{" "}
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Navbar />{" "}
      {/* This will render the Navbar component at the top of every page */}
      <Component {...pageProps} />
      <Footer />{" "}
      {/* This will render the Footer component at the bottom of every page */}
    </>
  );
}

export default MyApp;
