import { getAuth } from "firebase-admin/auth";
import { app } from "../configs/firebase.js";
import User from "../models/user.model.js";
import crypto from "node:crypto";

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

    // Set session cookie
    res.cookie("session", sessionId, {
      httpOnly: true,
      secure: false, // true in production with HTTPS
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({
      success: true,
      message: "Google authentication successful",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (err) {
    console.error("Google authentication error:", err);

    return res.status(401).json({
      success: false,
      message: "Authentication failed",
    });
  }
};