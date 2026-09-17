import Redis from "ioredis";

const redis = new Redis(process.env.REDIS_URL || "redis://localhost:6379", {
  maxRetriesPerRequest: 1,
  enableOfflineQueue: false,
  lazyConnect: true,
  retryStrategy(times) {
    if (times > 5) return null; // stop retrying until manual trigger
    return Math.min(times * 2000, 10000);
  },
});

let loggedWarning = false;
redis.on("error", (err) => {
  if (!loggedWarning) {
    console.warn("[Redis Notice] Redis is offline. In-memory session store active.", err.message);
    loggedWarning = true;
  }
});

export default redis;

