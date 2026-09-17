import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import proxy from "express-http-proxy";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

// Enable CORS for frontend clients with credentials (cookies)
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:5174",
      "http://127.0.0.1:5173",
    ],
    credentials: true,
  })
);

app.use(
  "/auth",
  proxy(process.env.AUTH_SERVICE_URL || "http://localhost:8001")
);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
