import { prismadb } from "@/lib/prismadb";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { stemmer } from "porter-stemmer";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { amount, sender, recipient } = body;

    const { userId } = await auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!amount) {
      return new NextResponse("Amount is required", { status: 400 });
    }

    const transactionUser = await prismadb.transactionUser.findFirst({
      where: {
        userId: userId,
      },
    });

    if (!transactionUser) {
      return new NextResponse(
        "Unable to locate transaction user linked to this user Id",
        { status: 500 }
      );
    }

    const transaction = await prismadb.transaction.create({
      data: {
        userId: userId,
        amount,
        name: transactionUser.name,
        transactionUserId: transactionUser.id,
        sender: sender ? true : false,
        recipient: recipient ? true : false,
        recurringBill: false,
        createdAt: new Date("2025-05-20"),
      },
    });

    return NextResponse.json(transaction);
  } catch (error) {
    console.log(`[TRANSACTIONS_POST]`, error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const paginate = searchParams.get("paginate");
    const take = searchParams.get("take") || "10";
    const cursor = searchParams.get("cursor");
    const category = searchParams.get("category");
    const startDate = searchParams.get("startDate");
    const endDate = searchParams.get("endDate");
    const sortBy = searchParams.get("sortBy");
    const senderOrRecipient = searchParams.get("senderOrRecipient") || "";
    const searchTerm = searchParams.get("searchTerm") ?? "";
    const stemmed = stemmer(searchTerm);
    let recurring: string | null | boolean | undefined =
      searchParams.get("recurring");

    if (recurring === "true") {
      recurring = true;
    } else if (recurring === "false") {
      recurring = false;
    } else {
      recurring = undefined;
    }

    const start = startDate ? new Date(startDate) : null;
    const end = endDate ? new Date(endDate) : null;
    end?.setHours(23, 59, 59, 999);

    const transactions = await prismadb.transaction.findMany({
      where: {
        OR: [
          {
            userId: userId,
            name: searchTerm
              ? { contains: stemmed, mode: "insensitive" }
              : undefined,
            transactionUser: category
              ? { category: { contains: category, mode: "insensitive" } }
              : undefined,
            sender: senderOrRecipient === "sender" ? true : undefined,
            recipient: senderOrRecipient === "recipient" ? true : undefined,
            recurringBill: recurring,
            createdAt:
              start && end
                ? {
                    gte: start,
                    lte: end,
                  }
                : undefined,
          },
          {
            starter: true,
            name: searchTerm
              ? { contains: stemmed, mode: "insensitive" }
              : undefined,
            transactionUser: category
              ? { category: { contains: category, mode: "insensitive" } }
              : undefined,
            sender: senderOrRecipient === "sender" ? true : undefined,
            recipient: senderOrRecipient === "recipient" ? true : undefined,
            recurringBill: recurring,
            createdAt:
              start && end
                ? {
                    gte: start,
                    lte: end,
                  }
                : undefined,
          },
          {
            userId: userId,
            name: searchTerm
              ? { contains: searchTerm, mode: "insensitive" }
              : undefined,
            transactionUser: category
              ? { category: { contains: category, mode: "insensitive" } }
              : undefined,
            sender: senderOrRecipient === "sender" ? true : undefined,
            recipient: senderOrRecipient === "recipient" ? true : undefined,
            recurringBill: recurring,
            createdAt:
              start && end
                ? {
                    gte: start,
                    lte: end,
                  }
                : undefined,
          },
          {
            starter: true,
            name: searchTerm
              ? { contains: searchTerm, mode: "insensitive" }
              : undefined,
            transactionUser: category
              ? { category: { contains: category, mode: "insensitive" } }
              : undefined,
            sender: senderOrRecipient === "sender" ? true : undefined,
            recipient: senderOrRecipient === "recipient" ? true : undefined,
            recurringBill: recurring,
            createdAt:
              start && end
                ? {
                    gte: start,
                    lte: end,
                  }
                : undefined,
          },
        ],
      },
      include: {
        transactionUser: true,
      },
      take: paginate ? Number(take) : undefined,
      cursor: cursor ? { id: cursor } : undefined,
      skip: paginate ? (cursor ? 1 : 0) : undefined,
      orderBy:
        sortBy === "latest"
          ? [{ createdAt: "desc" }, { id: "desc" }]
          : sortBy === "oldest"
          ? [{ createdAt: "asc" }, { id: "desc" }]
          : sortBy === "a-z"
          ? [{ name: "asc" }, { id: "desc" }]
          : sortBy === "z-a"
          ? [{ name: "desc" }, { id: "desc" }]
          : sortBy === "highest"
          ? [{ amount: "desc" }, { id: "desc" }]
          : sortBy === "lowest"
          ? [{ amount: "asc" }, { id: "desc" }]
          : { createdAt: "desc" },
    });

    return NextResponse.json({
      transactions,
      nextCursor:
        transactions.length === Number(take)
          ? transactions[transactions.length - 1].id
          : null,
    });
  } catch (error) {
    console.log(`[TRANSACTIONS_GET]`, error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
