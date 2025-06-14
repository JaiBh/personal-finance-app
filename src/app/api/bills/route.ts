import { prismadb } from "@/lib/prismadb";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { stemmer } from "porter-stemmer";

export async function GET(req: Request) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const searchTerm = searchParams.get("searchTerm") ?? "";
    const sortBy = searchParams.get("sortBy");
    const stemmed = stemmer(searchTerm);

    const bills = await prismadb.bill.findMany({
      where: {
        OR: [
          {
            starter: true,
            name: searchParams
              ? { contains: searchTerm, mode: "insensitive" }
              : undefined,
          },
          {
            starter: true,
            name: searchParams
              ? { contains: stemmed, mode: "insensitive" }
              : undefined,
          },
        ],
      },
      include: {
        transactionUser: true,
      },
      orderBy:
        sortBy === "latest"
          ? [{ billDayOfMonth: "asc" }, { id: "desc" }]
          : sortBy === "oldest"
          ? [{ billDayOfMonth: "desc" }, { id: "desc" }]
          : sortBy === "a-z"
          ? [{ name: "asc" }, { id: "desc" }]
          : sortBy === "z-a"
          ? [{ name: "desc" }, { id: "desc" }]
          : sortBy === "highest"
          ? [{ amount: "desc" }, { id: "desc" }]
          : sortBy === "lowest"
          ? [{ amount: "asc" }, { id: "desc" }]
          : { billDayOfMonth: "asc" },
    });

    return NextResponse.json(bills);
  } catch (error) {
    console.log(`[BILLS_GET]`, error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
