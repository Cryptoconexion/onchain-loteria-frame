const Jimp = require("jimp");
const path = process.cwd() + "/public/onchain-loteria/";

// Function to resize an image
// async function resizeImage(imagePath, width, height) {
//   const image = await Jimp.read(imagePath);
//   return image.resize(width, height);
// }

// Function to load, resize, and crop images
async function loadAndProcessImages() {
  const imageCount = 54; // Total number of images
  const firstImagePath = `${path}1.png`;
  const firstImage = await Jimp.read(firstImagePath);
  const targetHeight = 500;
  const targetWidth =
    (firstImage.bitmap.width / firstImage.bitmap.height) * targetHeight;

  const imagePromises = [];

  for (let num = 1; num <= imageCount; num++) {
    const imagePath = `${path}${num}.png`;
    const promise = resizeAndCropImage(imagePath, targetWidth, targetHeight);
    imagePromises.push(promise);
    console.log(`Image ${num} loaded, resized, and cropped.`);
  }

  const images = await Promise.all(imagePromises);
  return images; // Return resized and cropped images
}

// Function to resize and crop an image
async function resizeAndCropImage(imagePath, width, height) {
  const image = await Jimp.read(imagePath);

  // Resize the image
  await image.resize(width, height);

  // Calculate new dimensions to crop
  // const targetHeight = 500;
  const cropX = 10;
  const cropY = 10;
  // const cropX = 2;
  // const cropY = 2;
  const cropWidth = width - 2 * cropX; // Subtract twice the cropX to remove from both sides
  const cropHeight = height - 2 * cropY; // Subtract twice the cropY to remove from both sides

  // Crop the image
  await image.crop(cropX, cropY, cropWidth, cropHeight);

  return image;
}
// Function to create an atlas from the loaded and resized images
async function createAtlasFromProcessedImages(outputPath, scaleFactor = 1) {
  const images = await loadAndProcessImages();
  const atlasWidth = 6;
  const atlasHeight = 9;

  const baseWidth = images[0].bitmap.width;
  const baseHeight = images[0].bitmap.height;

  outputPath += `-${baseWidth}x${baseHeight}.png`;

  // Create an atlas with a white background
  const atlas = new Jimp(
    baseWidth * atlasWidth,
    baseHeight * atlasHeight,
    0xffffffff
  );

  // Place images into the atlas
  for (const [i, image] of images.entries()) {
    const x = (i % atlasWidth) * baseWidth;
    const y = Math.floor(i / atlasWidth) * baseHeight;
    atlas.composite(image, x, y);
  }

  // Save the atlas
  await atlas.writeAsync(outputPath);
  console.log("Atlas created and saved successfully.");
}

// Example usage
createAtlasFromProcessedImages("public/atlas/atlas");
