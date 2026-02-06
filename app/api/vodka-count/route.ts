import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

const DATA_FILE = path.join(process.cwd(), 'data', 'vodka-count.json');

async function ensureDataFile() {
  try {
    await fs.access(DATA_FILE);
  } catch {
    // Create directory and file if they don't exist
    await fs.mkdir(path.dirname(DATA_FILE), { recursive: true });
    await fs.writeFile(DATA_FILE, JSON.stringify({ count: 0 }));
  }
}

export async function GET() {
  await ensureDataFile();
  const data = await fs.readFile(DATA_FILE, 'utf-8');
  const { count } = JSON.parse(data);
  return NextResponse.json({ count });
}

export async function POST() {
  await ensureDataFile();
  const data = await fs.readFile(DATA_FILE, 'utf-8');
  const { count } = JSON.parse(data);
  const newCount = count + 1;
  await fs.writeFile(DATA_FILE, JSON.stringify({ count: newCount }));
  return NextResponse.json({ count: newCount });
}
