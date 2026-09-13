import express from "express";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables from gateway .env or parent backend .env
dotenv.config({ path: path.resolve(__dirname, ".env"), quiet: true });
dotenv.config({ path: path.resolve(__dirname, "../.env"), quiet: true });

const app = express();
const PORT = process.env.PORT || 8000;

app.get("/", (req, res) => {
  res.send("Hello, prasad!");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
