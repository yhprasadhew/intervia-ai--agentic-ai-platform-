import express from "express";
import dotenv from "dotenv";
import path from "node:path";
import { fileURLToPath } from "node:url";
import cors from "cors";
import cookieParser from "cookie-parser";
import proxy from "express-http-proxy";
import authMiddleware from "../shared/middlewares/auth.middleware.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(__dirname, ".env") });
dotenv.config({ path: path.resolve(__dirname, "../.env") });

const app = express();
const PORT = process.env.PORT || 8000;

// Parse cookies for gateway-level session authentication
app.use(cookieParser());

// Enable CORS for frontend clients with credentials
app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (curl, server-to-server, mobile)
      if (!origin) return callback(null, true);
      // Allow any localhost or 127.0.0.1 port
      if (
        /^http:\/\/localhost(:\d+)?$/.test(origin) ||
        /^http:\/\/127\.0\.0\.1(:\d+)?$/.test(origin)
      ) {
        return callback(null, true);
      }
      return callback(new Error("CORS origin not allowed: " + origin));
    },
    credentials: true,
  })
);

// Proxy /auth requests to auth service
app.use(
  "/auth",
  proxy(process.env.AUTH_SERVICE_URL || "http://localhost:8001", {
    proxyErrorHandler: (err, res, next) => {
      console.error("[Gateway Proxy Error] Auth service unreachable:", err.message);
      return res.status(502).json({
        success: false,
        message: "Auth service is unreachable on port 8001. Please ensure 'npm run dev:auth' is running.",
      });
    },
  })
);

// Fallback health route
app.get("/", (req, res) => {
  res.json({ service: "Intervia AI API Gateway", status: "online", port: PORT });
});

app.listen(PORT, () => {
  console.log(`API Gateway is running on port ${PORT}`);
});

