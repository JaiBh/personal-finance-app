import { isDemoUser } from "@/lib/auth/isDemoUser";
import { prismadb } from "@/lib/prismadb";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ potId: string }> }
) {
  try {
    const { potId } = await params;

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
    if (!potId) {
      return new NextResponse("Pot Id is required.", {
        status: 400,
      });
    }

    const pot = await prismadb.pot.update({
      where: {
        id: potId,
        userId,
      },
      data: {
        name: isDemoUser(userId) ? "Demo Pot" : name,
        theme,
        targetAmount,
        amount,
      },
    });

    const response = NextResponse.json(pot);

    // Add CORS headers
    response.headers.set("Access-Control-Allow-Origin", "*");
    response.headers.set("Access-Control-Allow-Methods", "GET, OPTIONS");
    response.headers.set("Access-Control-Allow-Headers", "Content-Type");

    return response;
  } catch (error) {
    console.log(`[POT_PATCH]`, error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ potId: string }> }
) {
  try {
    const { potId } = await params;

    const { userId } = await auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    if (!potId) {
      return new NextResponse("Pot Id is required.", {
        status: 400,
      });
    }

    const pot = await prismadb.pot.delete({
      where: {
        id: potId,
        userId,
      },
    });

    const response = NextResponse.json(pot);

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
