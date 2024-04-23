import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
const spaceName = "crypto-lottery";
const region = "sfo2"; // For example, "nyc3"

const clientEndpoint = `https://${spaceName}.${region}.digitaloceanspaces.com`;

const s3Client = new S3Client({
  forcePathStyle: false, // Configures to use subdomain/virtual calling format.
  endpoint: "https://sfo2.digitaloceanspaces.com",
  region: "sfo2",
  credentials: {
    accessKeyId: process.env.S3_ACCESS_KEY || "",
    secretAccessKey: process.env.S3_SECRET_KEY || "",
  },
});

export async function uploadToDigitalOceanSpace(
  fileName: string,
  buffer: Buffer,
  contentType: string
): Promise<string> {
  const command = new PutObjectCommand({
    Bucket: spaceName,
    Key: fileName,
    Body: buffer,
    ContentType: contentType,
    ACL: "public-read", // Make the file publicly readable
  });

  console.log("\n\n\nUploading to DigitalOcean Space...");

  try {
    await s3Client.send(command);

    // Construct the URL to access the file
    const fileUrl = `${clientEndpoint}/${fileName}`;
    console.log(`File uploaded successfully. Access it here: ${fileUrl}`);

    return fileUrl; // Return the URL for the uploaded file
  } catch (error) {
    console.error("Error uploading file to DigitalOcean Space", error);
    throw error; // Rethrow or handle error as appropriate for your application
  }
}
