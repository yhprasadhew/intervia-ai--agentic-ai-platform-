import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./configs/db.js";
import authRouter from "./routes/auth.route.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8001;

// Middleware
app.use(express.json());

// Routes
app.get("/", (req, res) => {
  res.json({
    service: "Intervia AI Auth Service",
    status: "running",
  });
});

app.use("/", authRouter);

// Start server after database connection
const startServer = async () => {
  try {
    await connectDB();

    app.listen(PORT, () => {
      console.log(`auth-service is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start auth-service:", error.message);
    process.exit(1);
  }
};

startServer();