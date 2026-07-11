import { NextResponse } from "next/server";
import { kv } from "@vercel/kv";
import Redis from "ioredis";

export const dynamic = "force-dynamic";

let redisClient: Redis | null = null;

// Initialize ioredis if REDIS_URL is provided in environment variables
if (process.env.REDIS_URL) {
  try {
    redisClient = new Redis(process.env.REDIS_URL, {
      maxRetriesPerRequest: 1,
      connectTimeout: 10000,
    });
    redisClient.on("error", (err) => {
      console.error("Redis client error:", err);
    });
  } catch (error) {
    console.error("Failed to initialize ioredis:", error);
  }
}

function isDbConfigured() {
  const hasVercelKv = !!(process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN);
  const hasRedisUrl = !!process.env.REDIS_URL;
  return hasVercelKv || hasRedisUrl;
}

export async function GET() {
  try {
    if (!isDbConfigured()) {
      return NextResponse.json({ fallback: true });
    }

    let wishes: any[] = [];

    if (redisClient) {
      // Retrieve from standard Redis via ioredis
      wishes = await redisClient.lrange("graduation_wishes", 0, -1);
    } else {
      // Retrieve from Vercel KV REST
      wishes = await kv.lrange("graduation_wishes", 0, -1);
    }

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
    console.error("Database fetch failed:", error);
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

    if (!isDbConfigured()) {
      return NextResponse.json({ fallback: true, data: newWish });
    }

    if (redisClient) {
      // Push to standard Redis via ioredis
      await redisClient.lpush("graduation_wishes", JSON.stringify(newWish));
    } else {
      // Push to Vercel KV REST
      await kv.lpush("graduation_wishes", JSON.stringify(newWish));
    }

    return NextResponse.json({ success: true, data: newWish });
  } catch (error) {
    console.error("Database save failed:", error);
    return NextResponse.json({ error: "Failed to save wish", fallback: true }, { status: 500 });
  }
}
