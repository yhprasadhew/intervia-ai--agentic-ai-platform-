import redis from "../redis/redis.js";

// Global in-memory fallback store for development or Redis downtime
const memoryStore = new Map();

/**
 * Save user session to Redis and in-memory cache
 * @param {string} sessionId
 * @param {object} payload - { userId, name, email, interviewCoins }
 * @param {number} ttlSeconds - defaults to 7 days
 */
export const setSession = async (sessionId, payload, ttlSeconds = 7 * 24 * 60 * 60) => {
  if (!sessionId || !payload) return;

  // Always store in memory fallback
  memoryStore.set(sessionId, {
    ...payload,
    _cachedAt: Date.now(),
  });

  // Store in Redis if connected and ready
  if (redis.status === "ready") {
    try {
      await redis.set(
        `session:${sessionId}`,
        JSON.stringify(payload),
        "EX",
        ttlSeconds
      );
    } catch (err) {
      console.warn("[SessionStore] Redis set failed, retained in memory:", err.message);
    }
  }
};

/**
 * Retrieve user session from Redis or in-memory cache
 * @param {string} sessionId
 * @returns {Promise<object|null>}
 */
export const getSession = async (sessionId) => {
  if (!sessionId) return null;

  // 1. Check Redis if available
  if (redis.status === "ready") {
    try {
      const data = await redis.get(`session:${sessionId}`);
      if (data) {
        return JSON.parse(data);
      }
    } catch (err) {
      console.warn("[SessionStore] Redis get failed, checking memory:", err.message);
    }
  }

  // 2. Fallback to in-memory store
  if (memoryStore.has(sessionId)) {
    return memoryStore.get(sessionId);
  }

  return null;
};

/**
 * Remove session from Redis and in-memory cache
 * @param {string} sessionId
 */
export const deleteSession = async (sessionId) => {
  if (!sessionId) return;

  memoryStore.delete(sessionId);

  if (redis.status === "ready") {
    try {
      await redis.del(`session:${sessionId}`);
    } catch (err) {
      console.warn("[SessionStore] Redis del failed:", err.message);
    }
  }
};
