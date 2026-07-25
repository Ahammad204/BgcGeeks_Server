import { Redis } from "ioredis";
require('dotenv').config();

let redis: Redis | null = null;

try {
    if (process.env.REDIS_URL) {
        redis = new Redis(process.env.REDIS_URL, {
            retryStrategy(times) {
                const delay = Math.min(times * 50, 2000);
                return times > 10 ? null : delay;
            },
            maxRetriesPerRequest: 3,
            connectTimeout: 10000,
        });

        redis.on("connect", () => {
            console.log("Redis Connected");
        });

        redis.on("error", (err) => {
            console.log("Redis connection error:", err.message);
        });
    } else {
        console.log("Redis URL not provided, running without Redis");
    }
} catch (err) {
    console.log("Redis initialization failed:", err);
}

export { redis };
