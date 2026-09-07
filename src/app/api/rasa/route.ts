import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { message, sender } = await req.json();
    
    const response = await fetch("http://127.0.0.1:5005/webhooks/rest/webhook", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ sender: sender || "user", message })
    });
    
    const data = await response.json();
    return NextResponse.json({ success: true, data });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Rasa server is not reachable" }, { status: 500 });
  }
}

