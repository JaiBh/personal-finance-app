import { prismadb } from "@/lib/prismadb";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import sample from "@/data/sampleTransactions.json";

export async function POST(req: Request) {
  try {
    const { userId } = await auth();
    if (!userId) {
      throw new NextResponse("Unauthorized", { status: 401 });
    }

    return NextResponse.json(null);
  } catch (error) {
    console.log(`[MISC_POST]`, error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
