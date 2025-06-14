import { prismadb } from "@/lib/prismadb";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const budgets = await prismadb.budget.findMany({
      where: {
        userId: userId,
      },
    });

    return NextResponse.json(budgets);
  } catch (error) {
    console.log(`[BUDGETS_GET]`, error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { category, maxSpend, theme } = body;

    const { userId } = await auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!category) {
      return new NextResponse("Category is required", { status: 400 });
    }
    if (!maxSpend && maxSpend !== 0) {
      return new NextResponse("Max Spend is required", { status: 400 });
    }
    if (!theme) {
      return new NextResponse("Theme is required", { status: 400 });
    }

    const taken = await prismadb.budget.findFirst({
      where: {
        OR: [
          {
            userId,
            theme,
          },
          {
            userId,
            category,
          },
        ],
      },
    });

    if (taken) {
      return new NextResponse("Theme or category already taken", {
        status: 400,
      });
    }

    const budget = await prismadb.budget.create({
      data: {
        userId: userId,
        maxSpend,
        theme,
        category,
      },
    });

    return NextResponse.json(budget);
  } catch (error) {
    console.log(`[BUDGETS_POST]`, error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
