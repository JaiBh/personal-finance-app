import { prismadb } from "@/lib/prismadb";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const pots = await prismadb.pot.findMany({
      where: {
        userId: userId,
      },
    });

    return NextResponse.json(pots);
  } catch (error) {
    console.log(`[POTS_GET]`, error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { amount, targetAmount, name, theme } = body;

    const { userId } = await auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!amount && amount !== 0) {
      return new NextResponse("Amount is required", { status: 400 });
    }
    if (!targetAmount) {
      return new NextResponse("Target Amount is required", { status: 400 });
    }
    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }
    if (!theme) {
      return new NextResponse("Theme is required", { status: 400 });
    }

    const taken = await prismadb.pot.findFirst({
      where: {
        userId,
        theme,
      },
    });

    if (taken) {
      return new NextResponse("Theme already taken", { status: 400 });
    }

    const pots = await prismadb.pot.create({
      data: {
        name,
        userId: userId,
        amount,
        theme,
        targetAmount,
      },
    });

    return NextResponse.json(pots);
  } catch (error) {
    console.log(`[POTS_POST]`, error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
