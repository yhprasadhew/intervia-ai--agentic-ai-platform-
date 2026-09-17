import mongoose from "mongoose";
import dns from "node:dns";
import dotenv from "dotenv";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(__dirname, "../.env") });
dotenv.config({ path: path.resolve(__dirname, "../../../.env") });

// Fix for Windows DNS issue where Node.js c-ares defaults to 127.0.0.1 on systems with virtual network adapters
if (dns.getServers().includes("127.0.0.1")) {
  dns.setServers(["8.8.8.8", "8.8.4.4"]);
}

export const connectDB = async () => {
  try {
    const uri = process.env.MONGODB_URI;
    if (!uri) {
      throw new Error("MONGODB_URI is not defined in environment variables.");
    }
    const conn = await mongoose.connect(uri);
    console.log(`Connected to MongoDB: ${conn.connection.host}`);
  } catch (error) {
    console.error("Error connecting to MongoDB:", error.message);
  }
};





