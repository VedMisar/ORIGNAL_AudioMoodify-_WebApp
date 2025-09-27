import { NextResponse } from "next/server";
import { MongoClient, ServerApiVersion } from "mongodb";

export async function GET() {
  const client = new MongoClient(process.env.MONGODB_URI!, {
    serverApi: ServerApiVersion.v1,
  });

  try {
    await client.connect();
    const db = client.db("audiomoodify");
    const collections = await db.collections();
    return NextResponse.json({
      message: "MongoDB connected!",
      collections: collections.map(c => c.collectionName),
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: (err as Error).message },
      { status: 500 }
    );
  } finally {
    await client.close();
  }
}
