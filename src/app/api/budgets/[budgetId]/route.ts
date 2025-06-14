import { prismadb } from "@/lib/prismadb";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ budgetId: string }> }
) {
  try {
    const { budgetId } = await params;

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

    if (!budgetId) {
      return new NextResponse("Budget Id is required.", {
        status: 400,
      });
    }

    const budget = await prismadb.budget.update({
      where: {
        id: budgetId,
        userId,
      },
      data: {
        maxSpend,
        category,
        theme,
      },
    });

    const response = NextResponse.json(budget);

    // Add CORS headers
    response.headers.set("Access-Control-Allow-Origin", "*");
    response.headers.set("Access-Control-Allow-Methods", "GET, OPTIONS");
    response.headers.set("Access-Control-Allow-Headers", "Content-Type");

    return response;
  } catch (error) {
    console.log(`[BUDGET_PATCH]`, error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ budgetId: string }> }
) {
  try {
    const { budgetId } = await params;

    const { userId } = await auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    if (!budgetId) {
      return new NextResponse("Budget Id is required.", {
        status: 400,
      });
    }

    const budget = await prismadb.budget.delete({
      where: {
        id: budgetId,
        userId,
      },
    });

    const response = NextResponse.json(budget);

    // Add CORS headers
    response.headers.set("Access-Control-Allow-Origin", "*");
    response.headers.set("Access-Control-Allow-Methods", "GET, OPTIONS");
    response.headers.set("Access-Control-Allow-Headers", "Content-Type");

    return response;
  } catch (error) {
    console.log(`[POT_DELETE]`, error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
