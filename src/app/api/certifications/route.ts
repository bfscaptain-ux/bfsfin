import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

const dataFilePath = path.join(process.cwd(), 'src', 'data', 'certifications.json');

export async function GET() {
  try {
    const fileContents = await fs.readFile(dataFilePath, 'utf8');
    const data = JSON.parse(fileContents);
    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error('Error reading certifications.json:', error);
    return NextResponse.json({ success: false, message: 'Failed to fetch' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    await fs.writeFile(dataFilePath, JSON.stringify(data, null, 2), 'utf8');
    return NextResponse.json({ success: true, message: 'Saved successfully' });
  } catch (error) {
    console.error('Error writing certifications.json:', error);
    return NextResponse.json({ success: false, message: 'Failed to save' }, { status: 500 });
  }
}
