import { getSession } from "../session/sessionStore.js";

/**
 * Reusable Authentication Middleware
 * 
 * Verifies that the incoming request has a valid session cookie or Bearer token.
 * Populates `req.user` with authenticated candidate details:
 *   - req.user.userId
 *   - req.user.name
 *   - req.user.email
 *   - req.user.interviewCoins
 * Also populates `req.sessionId`.
 */
export const authMiddleware = async (req, res, next) => {
  try {
    let token = null;

    // 1. Check HTTP-only session cookie
    if (req.cookies && req.cookies.session) {
      token = req.cookies.session;
    }

    // 2. Check Authorization header (Bearer <token>)
    if (!token && req.headers.authorization) {
      const parts = req.headers.authorization.split(" ");
      if (parts.length === 2 && /^bearer$/i.test(parts[0])) {
        token = parts[1];
      }
    }

    // 3. Check custom header fallback (X-Session-Id)
    if (!token && req.headers["x-session-id"]) {
      token = req.headers["x-session-id"];
    }

    // If no token or session ID provided
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Authentication required. No session cookie or token provided.",
      });
    }

    // Retrieve user session from Redis / in-memory store
    const sessionUser = await getSession(token);

    if (!sessionUser) {
      return res.status(401).json({
        success: false,
        message: "Session expired or invalid. Please sign in again.",
      });
    }

    // Attach user and session to request
    req.user = sessionUser;
    req.sessionId = token;

    return next();
  } catch (err) {
    console.error("[AuthMiddleware Error]:", err);
    return res.status(500).json({
      success: false,
      message: "Internal server error during authentication verification.",
    });
  }
};

export default authMiddleware;
