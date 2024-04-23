import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTwitter,
  faFacebookF,
  faInstagram,
  faLinkedinIn,
} from "@fortawesome/free-brands-svg-icons";

const Footer = () => {
  return (
    <footer className="footer p-10 bg-base-200 text-base-content">
      <div>
        <img src="/landing/LogoCrypto.png" alt="Logo" className="h-12 mb-2" />
        <p className="text-base w-full md:w-1/3">
          We are a group of professionals enthusiastic about closing the
          knowledge gap in the world of cryptocurrencies and blockchain. We aim
          to empower people with relevant information so they can be part of the
          new economy.
          <br />
          <span className="font-bold mt-5">
            {" "}
            CryptoConexión does not provide investment advice or
            recommendations."
          </span>
        </p>
      </div>
      <div>
        <span className="footer-title">Social</span>
        <div className="grid grid-flow-col gap-4">
          <a
            target="_blank"
            href="https://twitter.com/cryptoconexion"
            className="link link-hover"
          >
            <FontAwesomeIcon icon={faTwitter} />
          </a>
          <a
            target="_blank"
            href="https://www.facebook.com/profile.php?id=61555831554934"
            className="link link-hover"
          >
            <FontAwesomeIcon icon={faFacebookF} />
          </a>
          <a
            target="_blank"
            href="https://instagram.com/cryptoconexion"
            className="link link-hover"
          >
            <FontAwesomeIcon icon={faInstagram} />
          </a>
          <a
            target="_blank"
            href="https://www.linkedin.com/company/cryptoconexion/"
            className="link link-hover"
          >
            <FontAwesomeIcon icon={faLinkedinIn} />
          </a>

          <a
            target="_blank"
            href="https://warpcast.com/~/channel/onchainloteria"
            className="link link-hover"
          >
            <img
              src="/landing/warpcastgray.png"
              alt="Warpcast"
              className="w-5 h-5"
            />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
