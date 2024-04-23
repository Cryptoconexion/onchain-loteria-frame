const pinataSDK = require("@pinata/sdk");
const fs = require("fs");
const ck = require("ckey");

async function pinFile(_filePath) {
  console.log(ck.PINATA_SECRET_API_KEY);
  const pinata = new pinataSDK(ck.PINATA_API_KEY, ck.PINATA_SECRET_API_KEY);

  try {
    const readableStreamForFile = fs.createReadStream(_filePath);

    // Optional: Customize options for pinning
    const options = {
      pinataMetadata: {
        name: _filePath, // Change this to your desired name
        keyvalues: {
          customKey: "customValue", // Example of how to add custom key-values
        },
      },
      pinataOptions: {
        cidVersion: 0,
      },
    };
    // const options = {
    //   pinataMetadata: {
    //     name: "Atovix", // Optional: Set a name for your file
    //     description: "A 3D model of a Atovix.",
    //     image: "ipfs://QmawHPqhavurHQhhSAXfnmWBgNuFLY1nWBjJEWWXUc3SY7",
    //     external_url: "https://arenaton.com",
    //     animation_url: "ipfs://QmawHPqhavurHQhhSAXfnmWBgNuFLY1nWBjJEWWXUc3SY7",
    //     youtube_url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    //     background_color: "000000",
    //     attributes: [
    //       {
    //         trait_type: "Category",
    //         value: "Rocket",
    //       },
    //       {
    //         trait_type: "Quality",
    //         value: "High",
    //         display_type: "string",
    //       },
    //     ],
    //     properties: {
    //       files: [
    //         {
    //           uri: "ipfs://QmawHPqhavurHQhhSAXfnmWBgNuFLY1nWBjJEWWXUc3SY7",
    //           type: "glTF",
    //         },
    //       ],
    //       category: "3D model",
    //     },
    //   },
    //   pinataOptions: {
    //     cidVersion: 0,
    //   },
    // };

    const result = await pinata.pinFileToIPFS(readableStreamForFile, options);
    console.log("\n", _filePath); // Contains IPFS hash and other information
    console.log("\n", result); // Contains IPFS hash and other information
  } catch (error) {
    console.error(error);
  }
}

// pinFile("../assets/contractUri.json");
// pinFile("../assets/atovix.glb");

// pinFile("../assets/atovixImage.png");
// pinFile("../assets/metadata.json");

// pinFile("../assets/wolf.jpg");
// pinFile("../assets/wolf.glb");
pinFile("../assets/wolf.json");

// pinFile("../assets/robot.jpg");
// pinFile("../assets/robot.glb");
// pinFile("../assets/robot.json");

// pinFile("../assets/car.jpg");
// pinFile("../assets/car.glb");
// pinFile("../assets/car.json");
// {
//   "name": "Aton Rocket",
//   "description": "A 3D model of a futuristic rocket.",
//   "image": "ipfs://QmawHPqhavurHQhhSAXfnmWBgNuFLY1nWBjJEWWXUc3SY7",
//   "external_url": "https://arenaton.com",
//   "animation_url": "ipfs://QmawHPqhavurHQhhSAXfnmWBgNuFLY1nWBjJEWWXUc3SY7",
//   "youtube_url": "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
//   "background_color": "000000",
//   "attributes": [
//     {
//       "trait_type": "Category",
//       "value": "Rocket"
//     },
//     {
//       "trait_type": "Quality",
//       "value": "High",
//       "display_type": "string"
//     }
//   ],
//   "properties": {
//     "files": [
//       {
//         "uri": "ipfs://QmawHPqhavurHQhhSAXfnmWBgNuFLY1nWBjJEWWXUc3SY7",
//         "type": "glTF"
//       }
//     ],
//     "category": "3D model"
//   }
// }
