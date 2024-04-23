import Jimp from 'jimp';


async function generateImages() {
  const width = 1200/3;
  const height = 630/3;
  const numberOfImages = 54;

  for (let i = 1; i <= numberOfImages; i++) {
    // Generate a random solid color
    const randomColor = Jimp.rgbaToInt(
      Math.floor(Math.random() * 255), // Red
      Math.floor(Math.random() * 255), // Green
      Math.floor(Math.random() * 255), // Blue
      255 // Alpha for opacity
    );

    // Create a new image with the random solid background color
    const image = new Jimp(width, height, randomColor);

    // Save the image
    await image.writeAsync(`${i}.jpg`);
    console.log(`Generated image ${i}.jpg`);
  }
}


generateImages().then(() => console.log('All images have been generated.'));
