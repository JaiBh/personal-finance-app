"use client";

import Spinner from "../Spinner";
import OverviewCardHeader from "./OverviewCardHeader";
import RecentTransactions from "./RecentTransactions";
import { useGetTransactions } from "@/features/transactions/api/useGetTransactions";

function TransactionsCard() {
  const { data, isLoading } = useGetTransactions(5);
  const transactions = data?.page;

  return (
    <article className="bg-card rounded-xl pb-6 pt-4 px-5 space-y-6">
      <OverviewCardHeader
        title={"Transactions"}
        btnText={"View All"}
        href={"/transactions"}
      ></OverviewCardHeader>
      {isLoading ? (
        <div className="2xl:h-full">
          <Spinner></Spinner>
        </div>
      ) : !transactions || !transactions.length ? (
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
