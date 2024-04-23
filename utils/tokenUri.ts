import pinataSDK from "@pinata/sdk";
import { PinataPinOptions } from "@pinata/sdk";
import fetch from "node-fetch";
import Jimp from "jimp";
import { Readable } from "stream";
// Full list of Crypto Conexion card names
const cardNames = [
  "El Minero",
  "El Scammer",
  "La Degen",
  "El Degen",
  "La Wallet",
  "La Developer",
  "La Blockchain",
  "Los Noggles",
  "El NFT",
  "El Fantasma",
  "El Bitcoin",
  "El Buidler",
  "El Gorrito",
  "El Rugpull",
  "El Panda",
  "El Gas",
  "El Bear",
  "El Bull",
  "La Ardilla Voladora",
  "El Pajaro",
  "El Puente",
  "La Bota",
  "La Luna",
  "El Ambassador",
  "El Bro",
  "El Maxi",
  "El Corazón",
  "La Loba",
  "Los Layers",
  "El Pingüino",
  "Las Velas",
  "La DJ",
  "Los Nodos",
  "El Hodler",
  "La Estrella",
  "El Bucket Hat",
  "El Mundo",
  "El Robot",
  "Los Tippers",
  "La Runn3r",
  "El Lente",
  "La Calavera",
  "La Campana",
  "El Base",
  "El Shiba",
  "La Sunny",
  "La Corona",
  "El Voyager",
  "El Diamante",
  "El Dodge",
  "El Regen",
  "El Frutero",
  "El Bot",
  "La Rana",
];
// Process image from URL to lower resolution and return as buffer
async function processImageForLowRes(imageUrl) {
  try {
    const response = await fetch(imageUrl);
    const imageBuffer = await response.buffer();
    const image = await Jimp.read(imageBuffer);
    const processedImage = await image.resize(
      image.bitmap.width / 2,
      Jimp.AUTO
    );
    return await processedImage.getBufferAsync(Jimp.MIME_PNG);
  } catch (error) {
    console.error("Failed to process image:", error);
    throw error;
  }
}
export async function tokenUri(sequence, imageUrl, tokenId) {
  if (sequence.length !== 16) {
    return "Invalid Sequence";
  }
  // need new keyword here
  const pinata = new pinataSDK({
    pinataApiKey: process.env.PINATA_API_KEY,
    pinataSecretApiKey: process.env.PINATA_SECRET_API_KEY,
  });

  const optionsOriginal = {
    pinataMetadata: { name: "High Resolution Board" },
    pinataOptions: {
      cidVersion: 0 as 0 | 1,
    },
  };

  const optionsLow = {
    pinataMetadata: { name: "Low Resolution Board" },
    pinataOptions: {
      cidVersion: 0 as 0 | 1,
    },
  };

  // Fetch and process the original high resolution image
  const response = await fetch(imageUrl);
  const imageBuffer = await response.buffer();
  const imageStream = new Readable();
  imageStream.push(imageBuffer);
  imageStream.push(null);
  const originalImageResult = await pinata.pinFileToIPFS(imageStream, {
    pinataMetadata: { name: "High Resolution Board" },
    pinataOptions: { cidVersion: 0 },
  });

  // Process image to low resolution and pin it
  const lowResBuffer = await processImageForLowRes(imageUrl);
  const lowResStream = new Readable();
  lowResStream.push(lowResBuffer);
  lowResStream.push(null);
  const lowResImageResult = await pinata.pinFileToIPFS(lowResStream, {
    pinataMetadata: { name: "Low Resolution Board" },
    pinataOptions: { cidVersion: 0 },
  });

  let attributes = sequence.map((cardIndex, index) => ({
    trait_type: `Card ${index < 9 ? "0" + (index + 1) : index + 1}`,
    value: cardNames[cardIndex - 1],
  }));

  attributes = attributes.concat([
    { trait_type: "Sequence", value: sequence.join(",") },
    ...sequence.map((cardIndex) => ({
      trait_type: `${cardNames[cardIndex - 1]}`,
      value: "1",
    })),
  ]);

  const metadata = {
    name: `Onchain Loteria ${tokenId}`,
    description:
      "Step into the enchanting world of Lotería reimagined for the Web3 generation! Each card features dynamic characters from the Web3 universe, including the Degen, Regen, Buidler, Developer, and the mischievous Gas. This game blends tradition with technology, offering a gateway to explore blockchain concepts through play. Join us for a chance to support public good projects while engaging in a thrilling game of skill and chance.",
    image:
      "https://onchainloteria.mypinata.cloud/ipfs/" +
      lowResImageResult?.IpfsHash,
    external_url: "https://loteria.cryptoconexion.com/",
    animation_url:
      "https://onchainloteria.mypinata.cloud/ipfs/" +
      originalImageResult?.IpfsHash,
    collaborators: JSON.stringify([
      "0x7fe8959aD2cd65eF87a25d4A2ae310c2027BE13e",
    ]),
    attributes,
  };

  const metadataResult = await pinata.pinJSONToIPFS(metadata, optionsOriginal);
  return `https://onchainloteria.mypinata.cloud/ipfs/${metadataResult.IpfsHash}`;
}
