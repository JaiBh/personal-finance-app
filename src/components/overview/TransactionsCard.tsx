"use client";

import { useQuery } from "convex/react";
import OverviewCardHeader from "./OverviewCardHeader";
import { api } from "../../../convex/_generated/api";
import RecentTransactions from "./RecentTransactions";

function TransactionsCard() {
  const recentTransactions = useQuery(api.transactions.get)
    ?.sort((a, b) => {
      const aTime = new Date(a.transactionDate).getTime();
      const bTime = new Date(b.transactionDate).getTime();
      return bTime - aTime;
    })
    .slice(0, 4);

  return (
    <article className="bg-card rounded-xl py-6 px-5 grid gap-6">
      <OverviewCardHeader
        title={"Transactions"}
        btnText={"View All"}
        href={"/transactions"}
      ></OverviewCardHeader>
      {!recentTransactions || !recentTransactions.length ? (
        <div className="p-4 flex items-center justify-center">
          <p className="text-present-4">No transactions to show...</p>
        </div>
      ) : (
        <RecentTransactions
          recentTransactions={recentTransactions}
        ></RecentTransactions>
      )}
    </article>
  );
}
export default TransactionsCard;
