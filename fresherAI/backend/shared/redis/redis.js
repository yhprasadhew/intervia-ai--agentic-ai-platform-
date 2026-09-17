import Redis from "ioredis";

const redis = new Redis(process.env.REDIS_URL || "redis://localhost:6379", {
  maxRetriesPerRequest: 2,
});

redis.on("error", (err) => {
  console.warn("[Redis connection error]:", err.message);
});

export default redis;
