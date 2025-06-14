import RedirectAuth from "../RedirectAuth";
import OverviewCardHeader from "./OverviewCardHeader";
import RecentTransactions from "./RecentTransactions";
import { prismadb } from "@/lib/prismadb";
import { currentUser } from "@clerk/nextjs/server";

async function TransactionsCard() {
  const user = await currentUser();
  if (!user) {
    return <RedirectAuth></RedirectAuth>;
  }
  const transactions = await prismadb.transaction.findMany({
    where: {
      OR: [{ userId: user.id }, { starter: true }],
    },
    include: {
      transactionUser: true,
    },
    take: 5,
    orderBy: { createdAt: "desc" },
  });

  return (
    <article className="bg-card rounded-xl pb-6 pt-4 px-5 space-y-6">
      <OverviewCardHeader
        title={"Transactions"}
        btnText={"View All"}
        href={"/transactions"}
      ></OverviewCardHeader>
      {!transactions || !transactions.length ? (
        <div className="p-4 flex items-center justify-center">
          <p className="text-present-4">No transactions to show...</p>
        </div>
      ) : (
        <RecentTransactions
          recentTransactions={transactions}
        ></RecentTransactions>
      )}
    </article>
  );
}
export default TransactionsCard;
