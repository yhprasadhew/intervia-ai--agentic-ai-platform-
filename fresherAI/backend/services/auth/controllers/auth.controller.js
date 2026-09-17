import { getAuth } from "firebase-admin/auth";
import { app } from "../configs/firebase.js";
import User from "../models/user.model.js";
import crypto from "node:crypto";
import { setSession, deleteSession } from "../../../shared/session/sessionStore.js";

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
        name: decoded.name || (decoded.email ? decoded.email.split("@")[0] : "Candidate"),
        email: decoded.email,
      });
    }

    // Generate session ID
    const sessionId = crypto.randomUUID();

    const sessionPayload = {
      userId: user._id,
      name: user.name,
      email: user.email,
      interviewCoins: user.interviewCoins ?? 150,
    };

    // Store session via centralized sessionStore (Redis + in-memory fallback)
    await setSession(sessionId, sessionPayload);

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
  // req.user is guaranteed and attached by authMiddleware
  return res.status(200).json({
    success: true,
    user: req.user,
  });
};

export const Logout = async (req, res) => {
  try {
    const sessionId = req.sessionId || req.cookies?.session;

    if (sessionId) {
      await deleteSession(sessionId);
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