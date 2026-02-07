import { NextResponse } from 'next/server';
import { Redis } from '@upstash/redis';

const COUNTER_KEY = 'vodka-count';

// Check if Redis is configured
const isRedisConfigured = 
  process.env.UPSTASH_REDIS_REST_URL && 
  process.env.UPSTASH_REDIS_REST_TOKEN;

const redis = isRedisConfigured 
  ? new Redis({
      url: process.env.UPSTASH_REDIS_REST_URL!,
      token: process.env.UPSTASH_REDIS_REST_TOKEN!,
    })
  : null;

// Local fallback for development
let localCount = 0;

export async function GET() {
  try {
    if (redis) {
      const count = await redis.get<number>(COUNTER_KEY) ?? 0;
      return NextResponse.json({ count });
    } else {
      // Use local counter for development
      return NextResponse.json({ count: localCount });
    }
  } catch (error) {
    console.error('Failed to get count:', error);
    return NextResponse.json({ count: localCount });
  }
}

export async function POST() {
  try {
    if (redis) {
      const count = await redis.incr(COUNTER_KEY);
      return NextResponse.json({ count });
    } else {
      // Use local counter for development
      localCount++;
      return NextResponse.json({ count: localCount });
    }
  } catch (error) {
    console.error('Failed to increment count:', error);
    localCount++;
    return NextResponse.json({ count: localCount });
  }
}
