import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

const dataFilePath = path.join(process.cwd(), 'src', 'data', 'service-areas.json');

export async function GET() {
  try {
    const fileContent = await fs.readFile(dataFilePath, 'utf8');
    const data = JSON.parse(fileContent);
    return NextResponse.json({ success: true, data });
  } catch (error: any) {
    if (error.code === 'ENOENT') {
      return NextResponse.json({ success: true, data: [] });
    }
    return NextResponse.json({ success: false, error: 'Failed to read data' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    await fs.writeFile(dataFilePath, JSON.stringify(body, null, 2));
    return NextResponse.json({ success: true, message: 'Saved successfully' });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to save data' }, { status: 500 });
  }
}
