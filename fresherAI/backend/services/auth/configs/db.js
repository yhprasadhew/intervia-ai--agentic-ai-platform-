import mongoose from "mongoose";
import dns from "node:dns";

// Fix for Windows DNS issue where Node.js c-ares defaults to 127.0.0.1 on systems with virtual network adapters
if (dns.getServers().includes("127.0.0.1")) {
  dns.setServers(["8.8.8.8", "8.8.4.4"]);
}

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`Connected to MongoDB: ${conn.connection.host}`);
  } catch (error) {
    console.error("Error connecting to MongoDB:", error.message);
  }
};





