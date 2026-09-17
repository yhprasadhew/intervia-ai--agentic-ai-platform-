import { getAuth } from "firebase-admin/auth";
import { app } from "../configs/firebase.js";
import User from "../models/user.model.js";
import crypto from "node:crypto";
import redis from "../../../shared/redis/redis.js";

export const GoogleAuth = async (req, res) => {
  try {
    const { token } = req.body;

    if (!token) {
      return res.status(400).json({
        success: false,
        message: "Firebase token is required",
      });
    }

    // Verify Firebase ID token
    const decoded = await getAuth(app).verifyIdToken(token);

    // Find existing user
    let user = await User.findOne({
      firebaseUid: decoded.uid,
    });

    // Create user if not found
    if (!user) {
      user = await User.create({
        firebaseUid: decoded.uid,
        name: decoded.name || "User",
        email: decoded.email,
      });
    }

    // Generate session ID
    const sessionId = crypto.randomUUID();

    // Store session in Redis
    await redis.set(
      `session:${sessionId}`,
      JSON.stringify({
        userId: user._id,
        name: user.name,
        email: user.email,
        interviewCoins: user.interviewCoins ?? 150,
      }),
      "EX",
      7 * 24 * 60 * 60
    );

    // Set session cookie
    res.cookie("session", sessionId, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({
      success: true,
      message: "Authentication successful",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        interviewCoins: user.interviewCoins ?? 150,
      },
    });
  } catch (err) {
    console.error("Authentication error:", err);

    return res.status(401).json({
      success: false,
      message: err.message || "Authentication failed",
    });
  }
};

export const GetMe = async (req, res) => {
  try {
    const sessionId = req.cookies?.session;

    if (!sessionId) {
      return res.status(401).json({
        success: false,
        message: "Not authenticated",
      });
    }

    const sessionData = await redis.get(`session:${sessionId}`);
    if (!sessionData) {
      return res.status(401).json({
        success: false,
        message: "Session expired or invalid",
      });
    }

    const sessionUser = JSON.parse(sessionData);

    return res.status(200).json({
      success: true,
      user: sessionUser,
    });
  } catch (err) {
    console.error("GetMe error:", err);
    return res.status(500).json({
      success: false,
      message: "Failed to retrieve session",
    });
  }
};

export const Logout = async (req, res) => {
  try {
    // Get session ID from cookie
    const sessionId = req.cookies?.session;

    // Delete session from Redis
    if (sessionId) {
      await redis.del(`session:${sessionId}`);
    }

    // Clear session cookie
    res.clearCookie("session", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
    });

    return res.status(200).json({
      success: true,
      message: "Logout successful",
    });
  } catch (err) {
    console.error("Logout error:", err);

    return res.status(500).json({
      success: false,
      message: "Logout failed",
    });
  }
};