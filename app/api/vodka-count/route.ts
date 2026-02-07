import { NextResponse } from 'next/server';
import { Redis } from '@upstash/redis';

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL || '',
  token: process.env.UPSTASH_REDIS_REST_TOKEN || '',
});

const COUNTER_KEY = 'vodka-count';

export async function GET() {
  try {
    const count = await redis.get<number>(COUNTER_KEY) ?? 0;
    return NextResponse.json({ count });
  } catch (error) {
    console.error('Failed to get count:', error);
    return NextResponse.json({ count: 0 });
  }
}

export async function POST() {
  try {
    const count = await redis.incr(COUNTER_KEY);
    return NextResponse.json({ count });
  } catch (error) {
    console.error('Failed to increment count:', error);
    return NextResponse.json({ count: 0 }, { status: 500 });
  }
}
