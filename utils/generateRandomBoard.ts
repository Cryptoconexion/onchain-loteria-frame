import Jimp from "jimp";
import path from "path";
import { tokenUri } from "@utils/tokenUri";
import { uploadToDigitalOceanSpace } from "@utils/uploadToDigitalOceanSpace";
import { randomSequence } from "@utils/randomSequence";
// Assuming Board model is something like this:
interface Board {
  imageBoard: string | null;
  sequence: number[];
  resizedWidth: number;
  resizedHeight: number;
}

// Base path for the images, adjust as needed
const atlasFolder = path.join(process.cwd(), "/public/atlas/");

// Function to get and resize a Jimp image object
async function getAndResizeImage(
  imagePath: string,
  width: number,
  height: number
): Promise<Jimp> {
  const image = await Jimp.read(imagePath);
  return image.resize(width, height);
}



async function createLotteryBoardFrame(sequence: number[]): Promise<Board> {
  console.log("\n\n\n getCardsFromAtlas\n...");

  // Assuming getCardsFromAtlas provides an array of Jimp images and their dimensions
  const { images, w, h } = await getCardsFromAtlas(sequence, "low");

  // Load the background image (already 1200x630)
  const background = await Jimp.read(process.env.URL + "/board-mint.png");

  console.log("\nbacground", background.bitmap.width, background.bitmap.height);
  // Set the board to be 610 pixels high for the 4x4 grid of cards
  const totalCardsHeight = 610;
  const cardScaleFactor = totalCardsHeight / (h * 4);
  const cardScaledWidth = w * cardScaleFactor;
  const cardScaledHeight = h * cardScaleFactor;

  // Composite card images onto the background at their respective positions
  images.forEach((image, index) => {
    // Scale the card image
    // image.resize(cardScaledWidth, cardScaledHeight);

    // Calculate the position for each card
    const x = (index % 4) * w;
    const y = Math.floor(index / 4) * h;

    // Composite onto the background, aligning to the left
    background.composite(image, x, y);
  });

  // Generate the output file path
  const outputPath = `lottery-board-${sequence.join("-")}.jpg`;

  console.log("\n\n\nuploadToDigitalOceanSpace  buildFrameImage...");

  try {
    // Upload the final image to Digital Ocean Space
    const imageBuffer = await background.getBufferAsync(Jimp.MIME_JPEG);
    const urlFrameImage = await uploadToDigitalOceanSpace(
      outputPath,
      imageBuffer,
      Jimp.MIME_JPEG
    );

    console.log("\n\n\n\nURL", urlFrameImage);

    return {
      imageBoard: urlFrameImage, // URL to the uploaded image
      sequence: sequence,
      resizedWidth: 1200,
      resizedHeight: 630,
    };
  } catch (error) {
    console.error("Error during image processing and upload:", error);
    throw error; // Rethrow or handle as needed
  }
}
export async function createLotteryBoardsNftUri(Board: any): Promise<any> {
  // Function to get card images and their dimensions based on sequence
  const { images, w, h } = await getCardsFromAtlas(Board.sequence, "high");

  // Calculate the dimensions of the full board before resizing
  const boardWidth = w * 4; // 4 cards in width
  const boardHeight = h * 4; // 4 cards in height

  // Create a new image with the specified dimensions and white background
  const board = new Jimp(boardWidth, boardHeight, "#FFFFFF");

  // Composite card images onto the board at their respective positions
  images.forEach((image, index) => {
    const x = (index % 4) * w;
    const y = Math.floor(index / 4) * h;
    board.composite(image, x, y);
  });

  const outputPath = `lottery-board-${Board.sequence.join("-")}.jpg`;
  try {
    // Upload the final image to Digital Ocean Space
    const imageBuffer = await board.getBufferAsync(Jimp.MIME_JPEG);
    const urlFrameImage = await uploadToDigitalOceanSpace(
      outputPath,
      imageBuffer,
      Jimp.MIME_JPEG
    );

    const _tokenUri = await tokenUri(
      Board.sequence,
      urlFrameImage,
      Board.tokenId
    );
    console.log(
      "\n\n\n\n Boards Nft Uri:",
      Board.tokenId || "",
      _tokenUri,
      outputPath
    );

    Board.imageUrl = urlFrameImage;
    Board.tokenUri = _tokenUri;

    return Board;
  } catch (error) {
    console.error("Error during image processing and upload:", error);
    throw error; // Rethrow or handle as needed
  }
}

async function getCardsFromAtlas(sequence, resolution = "low") {
  // Assuming these are the correct dimensions of your atlas and cards
  // const atlasPath = `${atlasFolder}atlas-593x890.jpg`;
  // const atlasPath = `${atlasFolder}atlas-474x712.jpg`;
  // const atlasPath = `${atlasFolder}atlas-237x356.jpg`;
  // const atlasPath = `${atlasFolder}atlas-237x356.jpg`;

  let atlasPath;
  if (resolution == "low") {
    atlasPath = `${atlasFolder}atlas-102x157.png`;
  } else {
    // atlasPath = `${atlasFolder}atlas-237x356.jpg`;
    atlasPath = `${atlasFolder}atlas-309x480.png`;
  }

  // atlas-
  const atlas = await Jimp.read(atlasPath);
  const cols = 6; // Number of cards horizontally in the atlas
  const rows = 9; // Number of cards vertically in the atlas
  const cardWidth = atlas.bitmap.width / cols;
  const cardHeight = atlas.bitmap.height / rows;

  // Now we'll map over the sequence and crop each card from the atlas
  const images = sequence.map((cardIndex) => {
    // Assuming the first card starts at 0 index
    const adjustedIndex = cardIndex - 1;
    const x = (adjustedIndex % cols) * cardWidth;
    const y = Math.floor(adjustedIndex / cols) * cardHeight;

    // Crop the card from the atlas
    return atlas.clone().crop(x, y, cardWidth, cardHeight);
  });
  console.log("\n\n\ngetCardsFromAtlas... DONE", cardWidth, cardHeight);
  return { images, w: cardWidth, h: cardHeight };
}

export async function generateRandomBoard(): Promise<Board> {
  console.log("\n\n\nGenerating random board...", process.cwd());
  const sequence = randomSequence(16);
  return await createLotteryBoardFrame(sequence);
}

// import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
// const spaceName = "crypto-lottery";
// const region = "sfo2"; // For example, "nyc3"

// const clientEndpoint = `https://${spaceName}.${region}.digitaloceanspaces.com`;

// // Replace these with your DigitalOcean Space credentials
// // Configure the AWS SDK to use DigitalOcean Spaces
// const s3Client = new S3Client({
//   forcePathStyle: false, // Configures to use subdomain/virtual calling format.
//   endpoint: "https://sfo2.digitaloceanspaces.com",
//   region: "sfo2",
//   credentials: {
//     accessKeyId: process.env.S3_ACCESS_KEY || "",
//     secretAccessKey: process.env.S3_SECRET_KEY || "",
//   },
// });

// export async function uploadToDigitalOceanSpace(
//   fileName: string,
//   buffer: Buffer,
//   contentType: string
// ): Promise<string> {
//   const command = new PutObjectCommand({
//     Bucket: spaceName,
//     Key: fileName,
//     Body: buffer,
//     ContentType: contentType,
//     ACL: "public-read", // Make the file publicly readable
//   });

//   console.log("\n\n\nUploading to DigitalOcean Space...");

//   try {
//     await s3Client.send(command);

//     // Construct the URL to access the file
//     const fileUrl = `${clientEndpoint}/${fileName}`;
//     console.log(`File uploaded successfully. Access it here: ${fileUrl}`);

//     return fileUrl; // Return the URL for the uploaded file
//   } catch (error) {
//     console.error("Error uploading file to DigitalOcean Space", error);
//     throw error; // Rethrow or handle error as appropriate for your application
//   }
// }
