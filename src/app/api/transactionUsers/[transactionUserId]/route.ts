import { prismadb } from "@/lib/prismadb";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ transactionUserId: string }> }
) {
  try {
    const { transactionUserId } = await params;

    if (!transactionUserId) {
      return new NextResponse("Transaction User Id is required.", {
        status: 400,
      });
    }

    const transactionUser = await prismadb.transactionUser.findUnique({
      where: {
        id: transactionUserId,
      },
    });

    const response = NextResponse.json(transactionUser);

    // Add CORS headers
    response.headers.set("Access-Control-Allow-Origin", "*");
    response.headers.set("Access-Control-Allow-Methods", "GET, OPTIONS");
    response.headers.set("Access-Control-Allow-Headers", "Content-Type");

    return response;
  } catch (error) {
    console.log(`[TRANSACTIONUSER_GET]`, error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ transactionUserId: string }> }
) {
  try {
    const { transactionUserId } = await params;

    const body = await req.json();

    const { balance } = body;

    const { userId } = await auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    if (!balance && balance !== 0) {
      return new NextResponse("Amount is required", { status: 400 });
    }

    if (!transactionUserId) {
      return new NextResponse("Transaction user Id is required.", {
        status: 400,
      });
    }

    const transactionUser = await prismadb.transactionUser.update({
      where: {
        id: transactionUserId,
        userId,
      },
      data: {
        balance,
      },
    });

    const response = NextResponse.json(transactionUser);

    // Add CORS headers
    response.headers.set("Access-Control-Allow-Origin", "*");
    response.headers.set("Access-Control-Allow-Methods", "GET, OPTIONS");
    response.headers.set("Access-Control-Allow-Headers", "Content-Type");

    return response;
  } catch (error) {
    console.log(`[TRANSACTIONUSER_PATCH]`, error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
