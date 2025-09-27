import { NextResponse } from "next/server";

export async function GET() {
  const response = await fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&q=music&type=video&key=${process.env.YOUTUBE_API_KEY}`);
  const data = await response.json();
  return NextResponse.json(data.items);
}
