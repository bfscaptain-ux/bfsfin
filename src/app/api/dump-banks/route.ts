import { NextResponse } from 'next/server';
import { banksData, rbiRepoRate, lastUpdated } from '@/data/banksData';

export async function GET() {
  return NextResponse.json({ banksData, rbiRepoRate, lastUpdated });
}
