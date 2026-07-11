import { NextResponse } from "next/server";
import { kv } from "@vercel/kv";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    // If Vercel KV environment variables are not set, return fallback indicator
    if (!process.env.KV_REST_API_URL || !process.env.KV_REST_API_TOKEN) {
      return NextResponse.json({ fallback: true });
    }

    // Retrieve all wishes from the Vercel KV Redis list
    const wishes = await kv.lrange("graduation_wishes", 0, -1);
    
    // Parse list elements if they are stored as JSON strings
    const parsedWishes = wishes.map((wish: any) => {
      if (typeof wish === "string") {
        try {
          return JSON.parse(wish);
        } catch (e) {
          return wish;
        }
      }
      return wish;
    });

    return NextResponse.json({ success: true, data: parsedWishes });
  } catch (error) {
    console.error("Vercel KV fetch failed:", error);
    return NextResponse.json({ error: "Failed to fetch wishes", fallback: true }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { name, message, date } = await request.json();

    if (!name || !message) {
      return NextResponse.json({ error: "Name and message are required" }, { status: 400 });
    }

    const newWish = {
      id: String(Date.now()),
      name: name.trim(),
      message: message.trim(),
      date: date || new Date().toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }),
    };

    // If Vercel KV environment variables are not set, return fallback indicator
    if (!process.env.KV_REST_API_URL || !process.env.KV_REST_API_TOKEN) {
      return NextResponse.json({ fallback: true, data: newWish });
    }

    // Push the new wish to the top of the Vercel KV Redis list
    await kv.lpush("graduation_wishes", JSON.stringify(newWish));

    return NextResponse.json({ success: true, data: newWish });
  } catch (error) {
    console.error("Vercel KV save failed:", error);
    return NextResponse.json({ error: "Failed to save wish", fallback: true }, { status: 500 });
  }
}
