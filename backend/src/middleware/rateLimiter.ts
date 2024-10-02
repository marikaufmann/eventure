import { NextFunction, Request, Response } from "express";
import Redis from "ioredis";

export const redis = new Redis(process.env.UPSTASH_REDIS_URL as string);

const MAX_TOKENS = 5;
const REFILL_INTERVAL = 1;
const BUCKET_TTL = 4;  

const getOrCreateBucket = async (key: string, setTTL: boolean = false) => {
  try {
    const bucket = await redis.get(key);
    if (bucket) {
      return JSON.parse(bucket);
    } else {
      const newBucket = {
        tokens: MAX_TOKENS,
        lastRefill: Date.now(),
      };
      if (setTTL) {
        await redis.set(key, JSON.stringify(newBucket), "EX", BUCKET_TTL);
      } else {
        await redis.set(key, JSON.stringify(newBucket));
      }
      return newBucket;
    }
  } catch (err) {
    console.error(`Error getting or creating bucket for key ${key}:`, err);
    throw new Error("Redis error");
  }
};

const refillTokens = (bucket: { tokens: number; lastRefill: number }) => {
  const now = Date.now();
  const elapsedTime = (now - bucket.lastRefill) / 1000;
  const newTokens = Math.floor(elapsedTime / REFILL_INTERVAL);
  const tokens = Math.min(MAX_TOKENS, bucket.tokens + newTokens);
  const lastRefill =
    tokens === MAX_TOKENS
      ? now
      : bucket.lastRefill + newTokens * REFILL_INTERVAL * 1000;
  return { tokens, lastRefill };
};

export const rateLimit = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress;
  const key = `rate_limit_${ip}`;
  try {
    let bucket = await getOrCreateBucket(key);
    bucket = refillTokens(bucket);
    if (bucket.tokens > 0) {
      bucket.tokens -= 1;
      await redis.set(key, JSON.stringify(bucket));
      next();
    } else {
      res.status(429).send("Too many requests.");
    }
  } catch (err) {
    console.error(`Error in rate limiter middleware for IP ${ip}:`, err);
    res.status(500).send("Internal Server Error");
  }
};

export const ticketmasterRateLimit = async (key: string) => {
  try {
    let bucket = await getOrCreateBucket(key, true); 
    bucket = refillTokens(bucket);
    if (bucket.tokens > 0) {
      bucket.tokens -= 1;
      await redis.set(key, JSON.stringify(bucket), "EX", BUCKET_TTL);
      return true;
    } else {
      return false;
    }
  } catch (err) {
    console.error(`Error in rate limiter for key ${key}:`, err);
    throw new Error("Rate limiter error");
  }
};